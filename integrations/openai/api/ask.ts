import { OpenAIStream } from "@/integrations/openai/openai-stream"
import { ModelConfig } from "@/integrations/openai/utils/types"

export async function POST(req: Request) {
  const { prompt, apiKey } = (await req.json()) as {
    prompt?: string
    apiKey?: string
  }
  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 })
  }

  const payload: ModelConfig = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant that creates surveys. Always respond with valid, complete JSON objects. Do not include any text before or after the JSON object." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload, apiKey)
  return new Response(stream)
}
