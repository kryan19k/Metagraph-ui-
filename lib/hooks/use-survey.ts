/*
import { BaseError } from "viem"
import { baseSepolia } from "viem/chains"
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"

import { surveyAbi } from "../abis"
import { surveyContractAddress } from "../contractaddres"

const SURVEY_CONTRACT_ADDRESS = surveyContractAddress

// Types
interface Survey {
  creator: `0x${string}`
  dataHash: `0x${string}`
  rewardAmount: bigint
  rewardType: number
  rewardToken: `0x${string}`
  createdAt: bigint
  endTime: bigint
  status: number
  imageUri: string
  maxResponses: bigint
  currentResponses: bigint
  minimumResponseTime: bigint
  tags: string[]
}

interface SurveyStatistics {
  totalResponses: bigint
  totalRewardsDistributed: bigint
  averageResponseTime: bigint
  quickestResponseTime: bigint
  slowestResponseTime: bigint
}

// Write functions
export function useCreateSurvey() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()

  const handleCreateSurvey = async (
    dataHash: `0x${string}`,
    rewardAmount: bigint,
    rewardType: number,
    rewardToken: `0x${string}`,
    endTime: bigint,
    imageUri: string,
    maxResponses: bigint,
    minimumResponseTime: bigint,
    tags: string[]
  ) => {
    try {
      const result = await writeContract({
        address: SURVEY_CONTRACT_ADDRESS,
        abi: surveyAbi,
        functionName: 'createSurvey',
        args: [
          dataHash,
          rewardAmount,
          rewardType,
          rewardToken,
          endTime,
          imageUri,
          maxResponses,
          minimumResponseTime,
          tags,
        ],
      })
      return result
    } catch (e) {
      const error = e as BaseError
      console.error(error)
      throw error
    }
  }

  return {
    createSurvey: handleCreateSurvey,
    data: hash,
    error,
    isPending,
  }
}

// ... (rest of the file content)
*/

// Add an empty export to make this a module and avoid the isolatedModules error
export {}