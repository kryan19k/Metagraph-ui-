/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState } from "react"

interface SurveyCreationParams {
  creator: string
  title: string
  description: string
  questions: Array<{
    text: string
    type: "text" | "number" | "radio" | "checkbox" | "scale"
    options?: string[]
    min?: number
    max?: number
  }>
  tokenReward: string
  imageUri?: string
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

      const data = await response.json()

      if (!response.ok) {
        console.error("Survey creation error:", data)
        throw new Error(
          data.details || data.error || "An unknown error occurred"
        )
      }

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
