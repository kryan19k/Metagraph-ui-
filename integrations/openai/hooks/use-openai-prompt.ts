import { useState } from "react"

export const useOpenAIPrompt = () => {
  const [response, setResponse] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Generate an AI response from a prompt using the OpenAI API
   * It receives a stream of responses from the API and concatenates them into
   * a single string and updates the response state with it
   * More info: https://platform.openai.com/docs/api-reference/chat/create
   * @param prompt The prompt to generate a response from
   * @param apiKey The OpenAI API key to use. If not set, the default API key from env variable OPENAI_API_KEY will be used.
   */
  const generateAIResponse = async (prompt: string, apiKey?: string) => {
    setResponse("");
    setIsLoading(true);
    setError(null);
  
    try {
      console.log("Sending prompt to API:", prompt);
      const response = await fetch("/api/openai/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          apiKey,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API response error:", response.status, response.statusText, errorText);
        throw new Error(`API error: ${response.status} ${response.statusText}\n${errorText}`);
      }
  
      const data = response.body;
      if (!data) {
        throw new Error("No data received from the API");
      }
  
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedResponse = "";
  
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        accumulatedResponse += chunkValue;
      }
  
      console.log("Full accumulated response:", accumulatedResponse);
      setResponse(accumulatedResponse);
    } catch (err) {
      console.error("Detailed error in generateAIResponse:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };
  return {
    response,
    isLoading,
    error,
    generateAIResponse,
  }
}
