import { useState } from "react"

interface SurveyCreationParams {
  creator: string
  questions: Array<{
    text: string
    type: string
    options?: string[]
    min?: number
    max?: number
  }>
  tokenReward: string
  imageUri: string
  endTime: string
  maxResponses: string
  minimumResponseTime: string
  tags: string[]
}

interface SurveyCreationResult {
  surveyId: string
  privateKey: string
}

export function useCreateSurvey() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [surveyId, setSurveyId] = useState<string | null>(null)
  const [privateKey, setPrivateKey] = useState<string | null>(null)

  const handleCreateSurvey = async (
    params: SurveyCreationParams
  ): Promise<SurveyCreationResult> => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/surveys/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error("Failed to create survey")
      }

      const data: SurveyCreationResult = await response.json()
      setSurveyId(data.surveyId)
      setPrivateKey(data.privateKey)

      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"))
      throw err
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    handleCreateSurvey,
    isSubmitting,
    error,
    surveyId,
    privateKey,
  }
}
