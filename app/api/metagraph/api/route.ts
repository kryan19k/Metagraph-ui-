/* eslint-disable @typescript-eslint/no-unsafe-call */
import axios from 'axios';
import { dag4 } from '@stardust-collective/dag4';

interface CreateSurveyParams {
  surveyData: Omit<Survey, 'id'>;
  account: any;
}

const METAGRAPH_ID = process.env.METAGRAPH_ID || 'custom_id';
const L0_GLOBAL_URL = process.env.NEXT_PUBLIC_L0_GLOBAL_URL || 'http://localhost:9000';
const L1_DATA_URL = process.env.NEXT_PUBLIC_L1_DATA_URL || 'http://localhost:9100';

// Define interfaces
interface Question {
  id: string;
  text: string;
  questionType: string;
  options?: string[];
  min?: number;
  max?: number;
}

interface Survey {
  id: string;
  creator: string;
  title: string;
  description: string;
  questions: Question[];
  tokenReward: string;
  endTime: string;
  maxResponses: number;
  minimumResponseTime: number;
  tags: string[];
  totalParticipants: number;
  averageCompletionTime: number;
}

interface SurveyResponse {
  respondent: string;
  encryptedAnswers: string;
}

const api = axios.create({
  baseURL: L1_DATA_URL,
});

export const getAllSurveys = async (): Promise<Survey[]> => {
  try {
    const response = await api.get<Survey[]>(`/surveys`);
    return response.data || []; // Return an empty array if no surveys exist
  } catch (error) {
    console.error('Error fetching surveys:', error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // If the endpoint returns a 404, it means no surveys exist yet
      return [];
    }
    throw new Error('Failed to fetch surveys');
  }
};

export const getSurveyById = async (surveyId: string): Promise<Survey> => {
  try {
    const response = await api.get<Survey>(`/surveys/${surveyId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching survey ${surveyId}:`, error);
    throw new Error(`Failed to fetch survey ${surveyId}`);
  }
};

export const getSurveyResponses = async (surveyId: string): Promise<SurveyResponse[]> => {
  try {
    const response = await api.get<SurveyResponse[]>(`/surveys/${surveyId}/responses`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching responses for survey ${surveyId}:`, error);
    throw new Error(`Failed to fetch responses for survey ${surveyId}`);
  }
};


export const createSurvey = async ({ surveyData, account }: CreateSurveyParams): Promise<Survey> => {
  const metagraphAddress = process.env.NEXT_PUBLIC_METAGRAPH_ADDRESS;
  if (!metagraphAddress) {
    throw new Error('Metagraph address not configured. Please check your environment variables.');
  }

  try {
    const surveyCreationMessage = {
      CreateSurvey: {
        creator: surveyData.creator,
        title: surveyData.title,
        description: surveyData.description,
        questions: surveyData.questions,
        tokenReward: surveyData.tokenReward,
        endTime: surveyData.endTime,
        maxResponses: surveyData.maxResponses,
        minimumResponseTime: surveyData.minimumResponseTime,
        tags: surveyData.tags,
      }
    };

    const encodedMessage = JSON.stringify(surveyCreationMessage);
    
    console.log('Sending transaction to metagraph...');
    const txHash = await account.transferDag(metagraphAddress, 0, 0, encodedMessage);
    console.log('Transaction sent. Hash:', txHash);

    console.log('Checking transaction status...');
    await checkTransactionStatus(txHash);

    console.log('Fetching created survey...');
    const createdSurvey = await fetchSurveyByTxHash(txHash);
    console.log('Survey created successfully:', createdSurvey);

    return createdSurvey;
  } catch (error) {
    console.error('Error creating survey:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to create survey: ${error.message}`);
    } else {
      throw new Error('Failed to create survey: Unknown error');
    }
  }
};

const checkTransactionStatus = async (txHash: string): Promise<void> => {
  let pendingTx = await dag4.network.getPendingTransaction(txHash);
  
  while (pendingTx !== null) {
    console.log('Transaction is pending...');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
    pendingTx = await dag4.network.getPendingTransaction(txHash);
  }

  const confirmedTx = await dag4.network.getTransaction(txHash);

  if (confirmedTx) {
    console.log('Transaction confirmed');
  } else {
    console.log('Transaction dropped - not confirmed');
    throw new Error('Transaction failed to confirm');
  }
};

const fetchSurveyByTxHash = async (txHash: string): Promise<Survey> => {
  try {
    // This is a placeholder implementation. You'll need to replace this with actual logic to fetch the survey from your metagraph.
    const response = await api.get<Survey>(`/surveys/by-tx-hash/${txHash}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching survey by txHash ${txHash}:`, error);
    throw new Error(`Failed to fetch survey by txHash ${txHash}`);
  }
};