"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { ethers } from "ethers"
import { motion } from "framer-motion"
import { useFieldArray, useForm } from "react-hook-form"
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
  imageUri: z.string().url("Invalid image URL").optional(),
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
      imageUri: "",
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

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <h1 className="mb-6 text-3xl font-bold">Create a New Survey</h1>

        <IsWalletConnected>
          <div className="mb-4 flex items-center space-x-4">
            <WalletAddress />
            <WalletBalance />
            <WalletEnsName />
            <div className="text-sm">Reward Balance: {userRewards} DAG</div>
          </div>
        </IsWalletConnected>

        <IsWalletDisconnected>
          <p className="mb-4">Please connect your wallet to create a survey.</p>
        </IsWalletDisconnected>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control">
            <label className="label" htmlFor="title">
              <span className="label-text">Survey Title</span>
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              placeholder="Enter survey title"
              className="input input-bordered input-primary w-full"
            />
            {errors.title && (
              <span className="text-error">{errors.title.message}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="description">
              <span className="label-text">Survey Description</span>
            </label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Enter survey description"
              className="textarea textarea-primary h-24"
            />
            {errors.description && (
              <span className="text-error">{errors.description.message}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="tokenReward">
              <span className="label-text">Token Reward (DAG)</span>
            </label>
            <div className="flex items-center">
              <input
                id="tokenReward"
                type="text"
                {...register("tokenReward")}
                placeholder="Enter token reward amount"
                className="input input-bordered input-primary w-full"
              />
              <span className="btn btn-square">
                <FiDollarSign className="h-5 w-5" />
              </span>
            </div>
            {errors.tokenReward && (
              <span className="text-error">{errors.tokenReward.message}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="imageUri">
              <span className="label-text">Survey Image URL (optional)</span>
            </label>
            <div className="flex items-center">
              <input
                id="imageUri"
                type="text"
                {...register("imageUri")}
                placeholder="Enter image URL"
                className="input input-bordered input-primary w-full"
              />
              <span className="btn btn-square ml-2">
                <FiImage className="h-5 w-5" />
              </span>
            </div>
            {errors.imageUri && (
              <span className="text-error">{errors.imageUri.message}</span>
            )}
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">Questions</h2>
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-4 rounded-lg bg-base-200 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-medium">Question {index + 1}</h3>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => remove(index)}
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="form-control">
                    <label
                      className="label"
                      htmlFor={`questions.${index}.text`}
                    >
                      <span className="label-text">Question Text</span>
                    </label>
                    <input
                      {...register(`questions.${index}.text`)}
                      placeholder="Enter question text"
                      className="input input-bordered w-full"
                    />
                    {errors.questions?.[index]?.text?.message}
                  </div>

                  <div className="form-control">
                    <label
                      className="label"
                      htmlFor={`questions.${index}.type`}
                    >
                      <span className="label-text">Question Type</span>
                    </label>
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
                              className="btn btn-ghost btn-sm"
                              onClick={() => removeOption(index, optionIndex)}
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => addOption(index)}
                        >
                          <FiPlusCircle className="mr-2 h-4 w-4" />
                          Add Option
                        </button>
                      </div>
                    </div>
                  )}

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
                            // Ensure min is always less than or equal to max
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
                            const max = watch(`questions.${index}.max`) || 100
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
                            const min = watch(`questions.${index}.min`) || 0
                            if (value < min) {
                              setValue(`questions.${index}.max`, min)
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            <button
              type="button"
              onClick={() => append({ text: "", type: "text" })}
              className="btn btn-primary btn-block"
            >
              <FiPlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </button>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Creating Survey...
              </>
            ) : (
              <>
                <FiSave className="mr-2 h-4 w-4" />
                Create Survey
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
