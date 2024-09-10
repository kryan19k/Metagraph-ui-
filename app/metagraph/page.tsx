/* eslint-disable @typescript-eslint/await-thenable */
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FiList, FiPlus, FiSearch, FiSend } from "react-icons/fi"
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"

import {
  createSurvey,
  getAllSurveys,
  getSurveyById,
  getSurveyResponses,
  submitSurveyResponse,
} from "../api/metagraph/surveyMetagraphApi"

// Update interfaces based on the new survey structure
interface Survey {
  id: string
  creator: string
  title: string
  description: string
  questions: Question[]
  tokenReward: string
  endTime: string
  maxResponses: number
  minimumResponseTime: number
  tags: string[]
  totalParticipants: number
  averageCompletionTime: number
}

interface Question {
  id: string
  text: string
  questionType: string
  options?: string[]
  min?: number
  max?: number
}

interface SurveyResponse {
  respondent: string
  encryptedAnswers: string
}

export default function MetagraphTestPage() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: balanceData } = useBalance({ address })

  const [surveys, setSurveys] = useState<Survey[]>([])
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null)
  const [responses, setResponses] = useState<SurveyResponse[]>([])
  const [newSurveyTitle, setNewSurveyTitle] = useState("")
  const [newSurveyDescription, setNewSurveyDescription] = useState("")
  const [newSurveyQuestions, setNewSurveyQuestions] = useState<Question[]>([])
  const [newQuestionText, setNewQuestionText] = useState("")
  const [newQuestionType, setNewQuestionType] = useState("text")

  useEffect(() => {
    void fetchSurveys()
  }, [])

  const handleConnect = async () => {
    try {
      const stargazerConnector = connectors.find((c) => c.id === "stargazer")
      if (stargazerConnector) {
        await connect({ connector: stargazerConnector })
        toast({
          title: "Success",
          description: "Wallet connected successfully",
        })
      } else {
        throw new Error("Stargazer wallet not found")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast({
        title: "Error",
        description: "Failed to connect wallet",
        variant: "destructive",
      })
    }
  }

  const fetchSurveys = async () => {
    try {
      const fetchedSurveys = await getAllSurveys()
      setSurveys(fetchedSurveys)
      if (fetchedSurveys.length === 0) {
        toast({
          title: "Info",
          description: "No surveys available yet. Create your first survey!",
        })
      } else {
        toast({
          title: "Success",
          description: "Surveys fetched successfully",
        })
      }
    } catch (error) {
      console.error("Error fetching surveys:", error)
      toast({
        title: "Error",
        description: "Failed to fetch surveys",
        variant: "destructive",
      })
    }
  }

  const handleSelectSurvey = async (surveyId: string) => {
    try {
      const survey = await getSurveyById(surveyId)
      setSelectedSurvey(survey)
      const surveyResponses = await getSurveyResponses(surveyId)
      setResponses(surveyResponses.responses)
      toast({
        title: "Success",
        description: "Survey details fetched successfully",
      })
    } catch (error) {
      console.error("Error fetching survey details:", error)
      toast({
        title: "Error",
        description: "Failed to fetch survey details",
        variant: "destructive",
      })
    }
  }

  const handleAddQuestion = () => {
    if (newQuestionText) {
      setNewSurveyQuestions([
        ...newSurveyQuestions,
        {
          id: `q${newSurveyQuestions.length + 1}`,
          text: newQuestionText,
          questionType: newQuestionType,
        },
      ])
      setNewQuestionText("")
      setNewQuestionType("text")
    }
  }

  const handleCreateSurvey = async () => {
    if (!isConnected || !address) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return
    }

    if (
      !newSurveyTitle.trim() ||
      !newSurveyDescription.trim() ||
      newSurveyQuestions.length === 0
    ) {
      toast({
        title: "Error",
        description:
          "Please provide title, description, and at least one question",
        variant: "destructive",
      })
      return
    }

    try {
      const newSurvey = await createSurvey({
        creator: address,
        title: newSurveyTitle.trim(),
        description: newSurveyDescription.trim(),
        questions: newSurveyQuestions,
        tokenReward: "0",
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        maxResponses: 100,
        minimumResponseTime: 60,
        tags: [],
      })
      setSurveys([...surveys, newSurvey])
      setNewSurveyTitle("")
      setNewSurveyDescription("")
      setNewSurveyQuestions([])
      toast({
        title: "Success",
        description: "Survey created successfully",
      })
    } catch (error) {
      console.error("Error creating survey:", error)
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create survey",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto min-h-screen bg-base-200 p-4">
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold">
            Survey Metagraph Test Page
          </h1>
          <p className="text-xl text-base-content/70">
            Test your Survey Metagraph functionality here
          </p>
        </div>

        {isConnected ? (
          <>
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
                  <div className="badge badge-primary badge-lg">
                    DAG Balance: {balanceData?.formatted || "0"}{" "}
                    {balanceData?.symbol || "DAG"}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="card mb-8 bg-base-100 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-body">
                <h2 className="card-title mb-4">Create New Survey</h2>
                <Input
                  placeholder="Survey Title"
                  value={newSurveyTitle}
                  onChange={(e) => setNewSurveyTitle(e.target.value)}
                  className="mb-2"
                />
                <Textarea
                  placeholder="Survey Description"
                  value={newSurveyDescription}
                  onChange={(e) => setNewSurveyDescription(e.target.value)}
                  className="mb-2"
                />
                <div className="mb-2">
                  <Input
                    placeholder="Question Text"
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="mb-2"
                  />
                  <select
                    value={newQuestionType}
                    onChange={(e) => setNewQuestionType(e.target.value)}
                    className="select select-bordered w-full max-w-xs mb-2"
                  >
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="scale">Scale</option>
                  </select>
                  <Button onClick={handleAddQuestion}>Add Question</Button>
                </div>
                <ul className="list-disc pl-5 mb-2">
                  {newSurveyQuestions.map((q, index) => (
                    <li key={index}>
                      {q.text} ({q.questionType})
                    </li>
                  ))}
                </ul>
                <Button onClick={handleCreateSurvey}>
                  <FiPlus className="mr-2" />
                  Create Survey
                </Button>
              </div>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                className="card bg-base-100 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="card-body">
                  <h2 className="card-title mb-4">Surveys</h2>
                  {surveys.length === 0 ? (
                    <p className="text-base-content/70">
                      No surveys available. Create your first survey!
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {surveys.map((survey) => (
                        <li
                          key={survey.id}
                          className="flex items-center justify-between"
                        >
                          <span>{survey.title}</span>
                          <button
                            onClick={() => handleSelectSurvey(survey.id)}
                            className="btn btn-sm btn-outline"
                          >
                            <FiSearch className="mr-2" />
                            View Details
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>

              {selectedSurvey && (
                <motion.div
                  className="card bg-base-100 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="card-body">
                    <h2 className="card-title mb-4">Survey Details</h2>
                    <p>Title: {selectedSurvey.title}</p>
                    <p>Description: {selectedSurvey.description}</p>
                    <p>Creator: {selectedSurvey.creator}</p>
                    <p>Token Reward: {selectedSurvey.tokenReward}</p>
                    <p>
                      Total Participants: {selectedSurvey.totalParticipants}
                    </p>
                    <h3 className="font-bold mt-4">Questions:</h3>
                    <ul className="list-disc pl-5">
                      {selectedSurvey.questions.map((q, index) => (
                        <li key={index}>
                          {q.text} ({q.questionType})
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {responses.length > 0 && (
              <motion.div
                className="card mt-6 bg-base-100 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="card-body">
                  <h2 className="card-title mb-4">Survey Responses</h2>
                  <ul className="space-y-2">
                    {responses.map((response, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span>Respondent: {response.respondent}</span>
                        <span className="text-sm text-base-content/70">
                          Encrypted: {response.encryptedAnswers.slice(0, 20)}...
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </>
        ) : (
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
              <span>Please connect your wallet to use the test page.</span>
            </div>
            <Button onClick={handleConnect} className="btn-primary">
              Connect Wallet
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
