import { BaseError } from "viem"
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
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  const handleCreateSurvey = (
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
    writeContract({
      address: SURVEY_CONTRACT_ADDRESS,
      abi: surveyAbi,
      functionName: "createSurvey",
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
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  return {
    hash,
    error,
    isPending,
    handleCreateSurvey,
    isConfirming,
    isConfirmed,
  }
}

export function useSubmitResponse() {
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  const handleSubmitResponse = (
    surveyId: bigint,
    encryptedAnswer: `0x${string}`
  ) => {
    writeContract({
      address: SURVEY_CONTRACT_ADDRESS,
      abi: surveyAbi,
      functionName: "submitResponse",
      args: [surveyId, encryptedAnswer],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  return {
    hash,
    error,
    isPending,
    handleSubmitResponse,
    isConfirming,
    isConfirmed,
  }
}

export function useWithdrawReward() {
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  const handleWithdrawReward = (tokenAddress: `0x${string}`) => {
    writeContract({
      address: SURVEY_CONTRACT_ADDRESS,
      abi: surveyAbi,
      functionName: "withdrawReward",
      args: [tokenAddress],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  return {
    hash,
    error,
    isPending,
    handleWithdrawReward,
    isConfirming,
    isConfirmed,
  }
}

export function useCompleteSurvey() {
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  const handleCompleteSurvey = (surveyId: bigint) => {
    writeContract({
      address: SURVEY_CONTRACT_ADDRESS,
      abi: surveyAbi,
      functionName: "completeSurvey",
      args: [surveyId],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  return {
    hash,
    error,
    isPending,
    handleCompleteSurvey,
    isConfirming,
    isConfirmed,
  }
}

export function useCancelSurvey() {
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  const handleCancelSurvey = (surveyId: bigint) => {
    writeContract({
      address: SURVEY_CONTRACT_ADDRESS,
      abi: surveyAbi,
      functionName: "cancelSurvey",
      args: [surveyId],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  return {
    hash,
    error,
    isPending,
    handleCancelSurvey,
    isConfirming,
    isConfirmed,
  }
}

export function useUpdateSurveyEndTime() {
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  const handleUpdateSurveyEndTime = (surveyId: bigint, newEndTime: bigint) => {
    writeContract({
      address: SURVEY_CONTRACT_ADDRESS,
      abi: surveyAbi,
      functionName: "updateSurveyEndTime",
      args: [surveyId, newEndTime],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  return {
    hash,
    error,
    isPending,
    handleUpdateSurveyEndTime,
    isConfirming,
    isConfirmed,
  }
}

// Read functions
export function useGetSurveyDetails(surveyId: bigint) {
  const { data, error, isLoading, refetch } = useReadContract({
    address: SURVEY_CONTRACT_ADDRESS,
    abi: surveyAbi,
    functionName: "getSurveyDetails",
    args: [surveyId],
  })

  return {
    data: data as Survey | undefined,
    error: error as BaseError | null,
    isLoading,
    refetch,
  }
}

export function useGetSurveyStatistics(surveyId: bigint) {
  const { data, error, isLoading, refetch } = useReadContract({
    address: SURVEY_CONTRACT_ADDRESS,
    abi: surveyAbi,
    functionName: "getSurveyStatistics",
    args: [surveyId],
  })

  return {
    data: data as SurveyStatistics | undefined,
    error: error as BaseError | null,
    isLoading,
    refetch,
  }
}

export function useGetUserSurveys(userAddress: `0x${string}`) {
  const { data, error, isLoading, refetch } = useReadContract({
    address: SURVEY_CONTRACT_ADDRESS,
    abi: surveyAbi,
    functionName: "getUserSurveys",
    args: [userAddress],
  })

  return {
    data: data as bigint[] | undefined,
    error: error as BaseError | null,
    isLoading,
    refetch,
  }
}

export function useGetUserResponses(userAddress: `0x${string}`) {
  const { data, error, isLoading, refetch } = useReadContract({
    address: SURVEY_CONTRACT_ADDRESS,
    abi: surveyAbi,
    functionName: "getUserResponses",
    args: [userAddress],
  })

  return {
    data: data as bigint[] | undefined,
    error: error as BaseError | null,
    isLoading,
    refetch,
  }
}

export function useGetTaggedSurveys(tag: string) {
  const { data, error, isLoading, refetch } = useReadContract({
    address: SURVEY_CONTRACT_ADDRESS,
    abi: surveyAbi,
    functionName: "getTaggedSurveys",
    args: [tag],
  })

  return {
    data: data as bigint[] | undefined,
    error: error as BaseError | null,
    isLoading,
    refetch,
  }
}

export function useGetActiveSurveys() {
  const { data, error, isLoading, refetch } = useReadContract({
    address: SURVEY_CONTRACT_ADDRESS,
    abi: surveyAbi,
    functionName: "getActiveSurveys",
  })

  return {
    data: data as bigint[] | undefined,
    error: error as BaseError | null,
    isLoading,
    refetch,
  }
}

export function useGetUserRewards(userAddress: `0x${string}`) {
  const { data, error, isLoading, refetch } = useReadContract({
    address: SURVEY_CONTRACT_ADDRESS,
    abi: surveyAbi,
    functionName: "getUserRewards",
    args: [userAddress],
  })

  return {
    data: data as
      | {
          nativeReward: bigint
          tokenAddresses: `0x${string}`[]
          tokenAmounts: bigint[]
        }
      | undefined,
    error: error as BaseError | null,
    isLoading,
    refetch,
  }
}
