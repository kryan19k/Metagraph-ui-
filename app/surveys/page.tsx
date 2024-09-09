/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FiBarChart2, FiEdit, FiEye } from "react-icons/fi"
import { useAccount } from "wagmi"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { toast } from "@/components/ui/use-toast"
import { WalletAddress } from "@/components/blockchain/wallet-address"
import { WalletBalance } from "@/components/blockchain/wallet-balance"
import { WalletEnsName } from "@/components/blockchain/wallet-ens-name"
import { IsWalletConnected } from "@/components/shared/is-wallet-connected"
import { IsWalletDisconnected } from "@/components/shared/is-wallet-disconnected"
import SurveyCard from "@/components/surveycard"

interface Survey {
  id: string
  creator: string // This will store the wallet address of the creator
  title: string
  description: string
  tokenReward: string
  endTime: string
  maxResponses: string
  minimumResponseTime: string
  tags: string[]
  responses: Array<{
    respondent: string
    encryptedAnswers: string
  }>
  totalParticipants: number
  averageCompletionTime: number
}

export default function SurveysPage() {
  const router = useRouter()
  const [userSurveys, setUserSurveys] = useState<Survey[]>([])
  const [allSurveys, setAllSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { address } = useAccount()

  useEffect(() => {
    void fetchSurveys()
  }, [address])

  const fetchSurveys = async () => {
    try {
      setLoading(true)
      const [userResponse, allResponse] = await Promise.all([
        address
          ? fetch(`/api/surveys?creator=${address}`)
          : Promise.resolve(null),
        fetch("/api/surveys"),
      ])

      if (address && userResponse) {
        if (!userResponse.ok) throw new Error("Failed to fetch user surveys")
        const userData: Survey[] = await userResponse.json()
        setUserSurveys(userData)
      }

      if (!allResponse.ok) throw new Error("Failed to fetch all surveys")
      const allData: Survey[] = await allResponse.json()
      setAllSurveys(allData)
    } catch (error) {
      console.error("Error fetching surveys:", error)
      setError("Failed to fetch surveys")
      toast({
        title: "Error",
        description: "Failed to fetch surveys. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto min-h-screen bg-base-200 p-4">
        <div className="flex items-center justify-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto min-h-screen bg-base-200 p-4">
        <div className="alert alert-error">
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
          <span>{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto min-h-screen bg-base-200 p-4">
      <motion.div
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
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
              <span>Please connect your wallet to view surveys.</span>
            </div>
          </div>
        </IsWalletDisconnected>

        <h1 className="text-3xl font-bold mb-6">Your Surveys</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userSurveys.map((survey) => (
            <SurveyCard key={survey.id} survey={survey} isCreator={true} />
          ))}
        </div>

        {userSurveys.length === 0 && (
          <div className="alert alert-info mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>You haven&apos;t created any surveys yet.</span>
          </div>
        )}

        <div className="mt-8">
          <Link href="/surveyCreation" className="btn btn-primary">
            Create New Survey
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 mt-12">All Available Surveys</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allSurveys.map((survey) => (
            <SurveyCard key={survey.id} survey={survey} isCreator={false} />
          ))}
        </div>

        {allSurveys.length === 0 && (
          <div className="alert alert-info mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>No surveys available at the moment.</span>
          </div>
        )}
      </motion.div>
    </div>
  )
}
