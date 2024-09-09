"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { Controller, useForm } from "react-hook-form"
import { useAccount } from "wagmi"
import * as z from "zod"

import { encryptAnswers } from "@/lib/utils/encryption"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"

interface Survey {
  id: string
  title: string
  description: string
  imageUri?: string
  questions: Array<{
    text: string
    type: "text" | "number" | "radio" | "checkbox" | "scale"
    options?: string[]
    min?: number
    max?: number
  }>
  tokenReward: string
  endTime: string
  maxResponses: string
  minimumResponseTime: string
  tags: string[]
  totalParticipants: number
  averageCompletionTime: number
}

export default function SurveyParticipationPage() {
  const router = useRouter()
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userRewards, setUserRewards] = useState("0")
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)

  const schema = z.object({
    answers: z.array(z.union([z.string(), z.number(), z.array(z.string())])),
  })

  type FormData = z.infer<typeof schema>

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { answers: [] },
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await Promise.all([fetchSurveys(), fetchUserRewards()])
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error instanceof Error ? error.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [address])

  const fetchSurveys = async () => {
    try {
      const response = await fetch("/api/surveys")
      if (!response.ok) {
        throw new Error(`Failed to fetch surveys: ${response.statusText}`)
      }
      const data: Survey[] = await response.json()

      // Parse options for each question in each survey
      const parsedData = data.map((survey) => ({
        ...survey,
        questions: survey.questions.map((q) => ({
          ...q,
          options: q.options
            ? JSON.parse(q.options as unknown as string)
            : undefined,
        })),
      }))

      setSurveys(parsedData)
    } catch (error) {
      console.error("Error fetching surveys:", error)
      setError("Failed to fetch surveys")
    }
  }

  useEffect(() => {
    void fetchSurveys()
    if (address) {
      void fetchUserRewards()
    }
  }, [address])

  const fetchUserRewards = async () => {
    if (address) {
      try {
        const response = await fetch(`/api/rewards/${address}`)
        if (!response.ok) {
          throw new Error("Failed to fetch user rewards")
        }
        const data = await response.json()
        setUserRewards(data.rewardBalance)
      } catch (error) {
        console.error("Error fetching user rewards:", error)
        throw error
      }
    }
  }

  const onSubmit = async (data: FormData) => {
    if (!address || !selectedSurvey || startTime === null) {
      toast({
        title: "Error",
        description:
          "Please connect your wallet and select a survey to submit.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const encryptedAnswers = encryptAnswers(data.answers, "some-public-key")
      const completionTime = (Date.now() - startTime) / 1000 // in seconds
      const response = await fetch(
        `/api/surveys/${selectedSurvey.id}/responses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            respondent: address,
            encryptedAnswers,
            completionTime,
          }),
        }
      )

      if (!response.ok) throw new Error("Failed to submit survey")

      toast({
        title: "Success!",
        description: "Your survey response has been submitted.",
      })

      setSelectedSurvey(null)
      setStartTime(null)
      reset()
      void router.push("/thank-you")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit survey. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestion = (
    question: Survey["questions"][number],
    index: number
  ) => {
    switch (question.type) {
      case "text":
        return (
          <Controller
            name={`answers.${index}`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                className="w-full"
                placeholder="Enter your answer"
              />
            )}
          />
        )
      case "number":
        return (
          <Controller
            name={`answers.${index}`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                className="w-full"
                placeholder="Enter a number"
              />
            )}
          />
        )
      case "radio":
        return (
          <Controller
            name={`answers.${index}`}
            control={control}
            render={({ field }) => (
              <div className="form-control">
                {question.options &&
                  Array.isArray(question.options) &&
                  question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="label cursor-pointer">
                      <span className="label-text">{option}</span>
                      <input
                        type="radio"
                        className="radio-primary radio"
                        value={option}
                        checked={field.value === option}
                        onChange={() => field.onChange(option)}
                      />
                    </label>
                  ))}
              </div>
            )}
          />
        )
      case "checkbox":
        return (
          <Controller
            name={`answers.${index}`}
            control={control}
            render={({ field }) => (
              <div className="form-control">
                {question.options &&
                  Array.isArray(question.options) &&
                  question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="label cursor-pointer">
                      <span className="label-text">{option}</span>
                      <Checkbox
                        checked={(field.value as string[])?.includes(option)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...((field.value as string[]) || []), option]
                            : ((field.value as string[]) || []).filter(
                                (item) => item !== option
                              )
                          field.onChange(updatedValue)
                        }}
                      />
                    </label>
                  ))}
              </div>
            )}
          />
        )
      case "scale":
        return (
          <Controller
            name={`answers.${index}`}
            control={control}
            render={({ field }) => (
              <div className="form-control">
                <input
                  type="range"
                  min={question.min}
                  max={question.max}
                  value={field.value as number}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  className="range range-primary"
                />
                <div className="flex justify-between px-2 text-xs">
                  <span>{question.min}</span>
                  <span>{question.max}</span>
                </div>
              </div>
            )}
          />
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse">
          <div className="mb-4 h-12 w-3/4 rounded bg-base-300"></div>
          <div className="mb-2 h-6 w-full rounded bg-base-300"></div>
          <div className="mb-2 h-6 w-full rounded bg-base-300"></div>
          <div className="mb-4 h-48 w-full rounded bg-base-300"></div>
          <div className="h-10 w-1/4 rounded bg-base-300"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
        <Button className="mt-4" onClick={() => router.push("/surveys")}>
          Back to Surveys
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card mb-6 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <WalletAddress />
              <WalletBalance />
              <div className="text-sm">Reward Balance: {userRewards} DAG</div>
            </div>
          </div>
        </div>

        {!selectedSurvey ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map((survey) => (
              <motion.div
                key={survey.id}
                className="card bg-base-100 shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="card-body">
                  <h2 className="card-title">{survey.title}</h2>
                  <p className="text-sm">{survey.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {survey.tags.map((tag, index) => (
                      <span key={index} className="badge badge-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div>Reward: {survey.tokenReward} DAG</div>
                    <div>
                      Ends: {new Date(survey.endTime).toLocaleDateString()}
                    </div>
                    <div>Max Responses: {survey.maxResponses}</div>
                    <div>Min Time: {survey.minimumResponseTime}s</div>
                    <div>Participants: {survey.totalParticipants}</div>
                    <div>
                      Avg Time: {survey.averageCompletionTime.toFixed(2)}min
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-4">
                    <Button
                      onClick={() => {
                        setSelectedSurvey(survey)
                        setStartTime(Date.now())
                      }}
                    >
                      Participate
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card mb-6 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{selectedSurvey.title}</h2>
                <p>{selectedSurvey.description}</p>
                {selectedSurvey.imageUri && (
                  <figure>
                    <Image
                      src={selectedSurvey.imageUri}
                      alt="Survey Image"
                      width={400}
                      height={300}
                      layout="responsive"
                      className="rounded-lg"
                    />
                  </figure>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="card mb-6 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">
                      {selectedSurvey.questions[currentQuestion].text}
                    </h2>
                    {renderQuestion(
                      selectedSurvey.questions[currentQuestion],
                      currentQuestion
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between">
              <Button
                className="btn btn-outline"
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              {currentQuestion < selectedSurvey.questions.length - 1 ? (
                <Button
                  className="btn btn-primary"
                  onClick={() =>
                    setCurrentQuestion((prev) =>
                      Math.min(selectedSurvey.questions.length - 1, prev + 1)
                    )
                  }
                >
                  Next
                </Button>
              ) : (
                <Button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Survey"}
                </Button>
              )}
            </div>

            <div className="mt-6">
              <progress
                className="progress progress-primary w-full"
                value={
                  ((currentQuestion + 1) / selectedSurvey.questions.length) *
                  100
                }
                max="100"
              ></progress>
              <p className="mt-2 text-center">
                Question {currentQuestion + 1} of{" "}
                {selectedSurvey.questions.length}
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}
