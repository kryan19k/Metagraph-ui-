"use client"

import React, { useEffect, useState } from "react"
import error from "next/error"
import { zodResolver } from "@hookform/resolvers/zod"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { ethers } from "ethers"
import { AnimatePresence, motion } from "framer-motion"
import { useFieldArray, useForm } from "react-hook-form"
import { FaMagic } from "react-icons/fa"
import {
  FiDollarSign,
  FiImage,
  FiPlusCircle,
  FiSave,
  FiTrash2,
} from "react-icons/fi"
import { useAccount } from "wagmi"
import { z } from "zod"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { toast } from "@/components/ui/use-toast"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"
import { WalletEnsName } from "@/components/blockchain/wallet-ens-name"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import { useOpenAIPrompt } from "@/integrations/openai/hooks/use-openai-prompt"

const questionTypes = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "radio", label: "Single Choice" },
  { value: "checkbox", label: "Multiple Choice" },
  { value: "scale", label: "Scale" },
]

const surveySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, "Question text is required"),
        type: z.enum(["text", "number", "radio", "checkbox", "scale"]),
        options: z.array(z.string()).optional(),
        min: z.number().optional(),
        max: z.number().optional(),
      })
    )
    .min(1, "At least one question is required"),
  tokenReward: z.string().min(1, "Token reward is required"),
  imageUri: z
    .instanceof(File)
    .optional()
    .refine((file) => file === undefined || file.size <= 5000000, {
      message: "Image must be less than 5MB",
    }),
})

type SurveyFormData = z.infer<typeof surveySchema>

// Define a schema for the expected response
const surveyResponseSchema = z.object({
  id: z.string(),
  // Add other fields as necessary
})

type SurveyResponse = z.infer<typeof surveyResponseSchema>

export default function SurveyCreationPage() {
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userRewards, setUserRewards] = useState("0")
  const { response, isLoading, error, generateAIResponse } = useOpenAIPrompt()

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      title: "",
      description: "",
      questions: [{ text: "", type: "text", options: [] }],
      tokenReward: "",
      imageUri: undefined,
    },
  })

  const { fields, append, remove } = useFieldArray<SurveyFormData>({
    control,
    name: "questions",
  })

  useEffect(() => {
    if (address) {
      void fetchUserRewards(address)
    }
  }, [address])

  const fetchUserRewards = async (userAddress: string) => {
    try {
      const response = await fetch(`/rewards/${userAddress}`)
      if (!response.ok) throw new Error("Failed to fetch user rewards")
      const data = await response.json()
      setUserRewards(ethers.utils.formatEther(data.rewardBalance))
    } catch (error) {
      console.error("Error fetching user rewards:", error)
      toast({
        title: "Error fetching rewards",
        description: "Failed to fetch your current reward balance.",
        variant: "destructive",
      })
    }
  }

  const onSubmit = async (data: SurveyFormData) => {
    if (!address) {
      openConnectModal?.()
      return
    }

    setIsSubmitting(true)
    try {
      const surveyData = {
        creator: address,
        title: data.title,
        description: data.description,
        questions: data.questions,
        tokenReward: data.tokenReward,
        imageUri: data.imageUri || "",
      }

      const response = await fetch("/api/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      })

      if (!response.ok) {
        throw new Error("Failed to create survey")
      }

      const result = await response.json()

      // Validate the response
      const parsedResult = surveyResponseSchema.safeParse(result)

      if (parsedResult.success) {
        const surveyResponse: SurveyResponse = parsedResult.data
        toast({
          title: "Survey created successfully!",
          description: `Survey ID: ${surveyResponse.id}`,
          variant: "default",
        })
      } else {
        console.error("Invalid response format:", parsedResult.error)
        toast({
          title: "Survey created, but couldn't retrieve ID",
          description: "Please check the surveys list for your new survey.",
          variant: "default", // Changed from "warning" to "default"
        })
      }

      // Optionally, redirect to the survey details page
      // router.push(`/surveys/${surveyResponse.id}`)
    } catch (error) {
      toast({
        title: "Error creating survey",
        description: error instanceof Error ? error.message : String(error),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addOption = (index: number) => {
    const currentOptions = watch(`questions.${index}.options`) || []
    const newOptions = [...currentOptions, ""]
    setValue(`questions.${index}.options`, newOptions)
    toast({
      title: "Option added",
      description: "A new option has been added to the question.",
      variant: "default",
    })
  }

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = watch(`questions.${questionIndex}.options`) || []
    const newOptions = currentOptions.filter(
      (_, index) => index !== optionIndex
    )
    setValue(`questions.${questionIndex}.options`, newOptions)
    toast({
      title: "Option removed",
      description: "The option has been removed from the question.",
      variant: "default",
    })
  }

  const handleAIPrompt = async () => {
    const userPrompt = prompt("Describe the survey you want to create:")
    if (!userPrompt) return

    try {
      await generateAIResponse(
        `Create a survey with the following description: ${userPrompt}. Provide the survey title, description, and 3 questions with their types (text, number, radio, checkbox, or scale). Format the response as valid JSON with the following structure:
        {
          "survey_title": "Survey Title",
          "description": "Survey Description",
          "questions": [
            {
              "question": "Question 1",
              "type": "text"
            },
            {
              "question": "Question 2",
              "type": "radio",
              "options": ["Option 1", "Option 2", "Option 3"]
            },
            {
              "question": "Question 3",
              "type": "scale",
              "min": 1,
              "max": 5
            }
          ]
        }
        Ensure the response is valid JSON and nothing else. Do not include any explanation or additional text outside the JSON object.`
      )
    } catch (error) {
      console.error("Error generating AI survey:", error)
      toast({
        title: "Error",
        description: "Failed to generate AI survey. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    if (response) {
      console.log("Raw AI response:", response)
      try {
        // Remove any leading or trailing whitespace and extra curly braces
        const jsonString = response
          .trim()
          .replace(/^{*/, "{")
          .replace(/}*$/, "}")

        const surveyData = JSON.parse(jsonString) as {
          survey_title?: string
          title?: string
          description: string
          questions: Array<{
            question?: string
            text?: string
            type: string
            options?: string[]
            min?: number
            max?: number
          }>
        }

        // Adjust for the different key names in the API response
        setValue("title", surveyData.survey_title || surveyData.title || "")
        setValue("description", surveyData.description)

        // Clear existing questions
        setValue("questions", [])

        // Add new questions
        surveyData.questions.forEach((q, index) => {
          append({
            text: q.question || q.text || "",
            type: q.type as "text" | "number" | "radio" | "checkbox" | "scale",
            options: q.options || [],
            min: q.min,
            max: q.max,
          })
        })

        toast({
          title: "AI Survey Generated",
          description:
            "The survey has been populated with AI-generated content.",
          variant: "default",
        })
      } catch (error) {
        console.error("Error parsing AI response:", error)
        console.error("Problematic response:", response)
        toast({
          title: "Error",
          description: "Failed to parse AI-generated survey. Please try again.",
          variant: "destructive",
        })
      }
    }
  }, [response, setValue, append])

  return (
    <div className="container mx-auto min-h-screen bg-base-200 p-4">
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">Create Your Survey</h1>
          <p className="text-xl text-base-content/70">
            Design, reward, and launch your survey in minutes
          </p>
        </div>

        <IsWalletConnected>
          <motion.div
            className="card mb-8 bg-base-100 shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="card-body">
              <h2 className="card-title mb-4">Your Wallet</h2>
              <div className="flex flex-wrap items-center gap-4">
                <WalletAddress />
                <WalletBalance />
                <WalletEnsName />
                <div className="badge badge-primary badge-lg">
                  Reward Balance: {userRewards} DAG
                </div>
              </div>
            </div>
          </motion.div>
        </IsWalletConnected>

        <IsWalletDisconnected>
          <div className="alert alert-warning mb-8 shadow-lg">
            <div>
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Please connect your wallet to create a survey.</span>
            </div>
          </div>
        </IsWalletDisconnected>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <motion.div
            className="card bg-base-100 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-body">
              <h2 className="card-title mb-4">Survey Details</h2>

              <div className="form-control">
                <label className="label" htmlFor="title">
                  <span className="label-text">Survey Title</span>
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  placeholder="Enter an engaging title for your survey"
                  className="input input-bordered input-primary w-full"
                />
                {errors.title && (
                  <span className="mt-1 text-error">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label" htmlFor="description">
                  <span className="label-text">Survey Description</span>
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe what your survey is about and why people should participate"
                  className="textarea textarea-primary h-24"
                />
                {errors.description && (
                  <span className="mt-1 text-error">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label" htmlFor="tokenReward">
                  <span className="label-text">Token Reward (DAG)</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    id="tokenReward"
                    type="text"
                    {...register("tokenReward")}
                    placeholder="Enter reward amount"
                    className="input input-bordered input-primary w-full pr-12"
                  />
                  <span className="btn btn-square btn-primary absolute right-0">
                    <FiDollarSign className="h-5 w-5" />
                  </span>
                </div>
                {errors.tokenReward && (
                  <span className="mt-1 text-error">
                    {errors.tokenReward.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label" htmlFor="imageUri">
                  <span className="label-text">Survey Image (optional)</span>
                </label>
                <input
                  type="file"
                  id="imageUri"
                  {...register("imageUri")}
                  className="file-input file-input-bordered file-input-primary w-full"
                  accept="image/*"
                />
                {errors.imageUri && (
                  <span className="mt-1 text-error">
                    {errors.imageUri.message}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="card bg-base-100 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-body">
              <h2 className="card-title mb-4">Survey Questions</h2>

              <AnimatePresence>
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="card mb-4 bg-base-200 shadow-md"
                  >
                    <div className="card-body">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-medium">
                          Question {index + 1}
                        </h3>
                        <button
                          type="button"
                          className="btn btn-circle btn-ghost"
                          onClick={() => remove(index)}
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Question text input */}
                        <div className="form-control">
                          <input
                            {...register(`questions.${index}.text`)}
                            placeholder="Enter your question here"
                            className="input input-bordered w-full"
                          />
                          {errors.questions?.[index]?.text?.message && (
                            <span className="mt-1 text-error">
                              {errors.questions?.[index]?.text?.message}
                            </span>
                          )}
                        </div>

                        {/* Question type select */}
                        <div className="form-control">
                          <select
                            {...register(`questions.${index}.type`)}
                            className="select select-bordered w-full"
                          >
                            {questionTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Render options for radio and checkbox questions */}
                        {["radio", "checkbox"].includes(
                          watch(`questions.${index}.type`)
                        ) && (
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Options</span>
                            </label>
                            <div className="space-y-2">
                              {field.options?.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    {...register(
                                      `questions.${index}.options.${optionIndex}` as const
                                    )}
                                    placeholder={`Option ${optionIndex + 1}`}
                                    className="input input-bordered input-primary grow"
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-circle btn-ghost btn-sm"
                                    onClick={() =>
                                      removeOption(index, optionIndex)
                                    }
                                  >
                                    <FiTrash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="btn btn-outline btn-primary btn-sm"
                                onClick={() => addOption(index)}
                              >
                                <FiPlusCircle className="mr-2 h-4 w-4" />
                                Add Option
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Render scale inputs for scale questions */}
                        {watch(`questions.${index}.type`) === "scale" && (
                          <div className="space-y-4">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text">Scale Range</span>
                              </label>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                className="range range-primary"
                                {...register(`questions.${index}.max`, {
                                  valueAsNumber: true,
                                })}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10)
                                  setValue(`questions.${index}.max`, value)
                                  const currentMin =
                                    watch(`questions.${index}.min`) || 0
                                  if (currentMin > value) {
                                    setValue(`questions.${index}.min`, value)
                                  }
                                }}
                              />
                            </div>
                            <div className="flex justify-between">
                              <input
                                type="number"
                                {...register(`questions.${index}.min`, {
                                  valueAsNumber: true,
                                })}
                                className="input input-bordered input-primary w-20"
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10)
                                  const max =
                                    watch(`questions.${index}.max`) || 100
                                  if (value > max) {
                                    setValue(`questions.${index}.min`, max)
                                  }
                                }}
                              />
                              <input
                                type="number"
                                {...register(`questions.${index}.max`, {
                                  valueAsNumber: true,
                                })}
                                className="input input-bordered input-primary w-20"
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10)
                                  const min =
                                    watch(`questions.${index}.min`) || 0
                                  if (value < min) {
                                    setValue(`questions.${index}.max`, min)
                                  }
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => append({ text: "", type: "text" })}
                className="btn btn-outline btn-primary btn-block"
              >
                <FiPlusCircle className="mr-2 h-4 w-4" />
                Add Question
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creating Your Survey...
                </>
              ) : (
                <>
                  <FiSave className="mr-2 h-5 w-5" />
                  Launch Survey
                </>
              )}
            </button>
          </motion.div>
          {error && (
            <div className="alert alert-error shadow-lg mt-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
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
                <span>Error: {error}</span>
              </div>
            </div>
          )}

          {/* Add the AI Survey Generation button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              type="button"
              onClick={handleAIPrompt}
              className="btn btn-secondary btn-block mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Generating AI Survey...
                </>
              ) : (
                <>
                  <FaMagic className="mr-2 h-5 w-5" />
                  Generate AI Survey
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}
