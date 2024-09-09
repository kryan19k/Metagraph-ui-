import { v4 as uuidv4 } from 'uuid';

export interface Survey {
  id: string;
  creator: string; // This will store the wallet address of the creator
  title: string;
  description: string;
  questions: Array<{
    id: string;
    text: string;
    type: "text" | "radio" | "checkbox" | "scale";
    options?: string[];
    min?: number;
    max?: number;
  }>;
  tokenReward: string;
  endTime: string;
  maxResponses: string;
  minimumResponseTime: string;
  tags: string[];
  responses: Array<{
    respondent: string;
    encryptedAnswers: string;
  }>;
  totalParticipants: number;
  averageCompletionTime: number;
}

class MockDataStore {
  private surveys: Survey[] = [];
  private userRewards: { [address: string]: string } = {};

  constructor() {
    console.log("Initializing MockDataStore");
    this.loadState();
    if (this.surveys.length === 0) {
      this.initializeSampleSurveys();
    }
  }
  
  private initializeSampleSurveys() {
    const survey1 = this.createSurvey({
      title: "User Experience Survey for SurveyChain dApp",
      description: "Help us improve your experience with SurveyChain by providing your feedback.",
      questions: [
        {
          id: uuidv4(),
          text: "How easy was it to connect your wallet to SurveyChain?",
          type: "scale",
          min: 1,
          max: 5
        },
        {
          id: uuidv4(),
          text: "Which features of SurveyChain do you find most useful?",
          type: "checkbox",
          options: ["Survey Creation", "Survey Participation", "Token Rewards", "Data Encryption", "User-friendly Interface"]
        },
        {
          id: uuidv4(),
          text: "How likely are you to recommend SurveyChain to others?",
          type: "scale",
          min: 0,
          max: 10
        },
        {
          id: uuidv4(),
          text: "What improvements would you suggest for SurveyChain?",
          type: "text"
        }
      ],
      creator: "0x1234567890123456789012345678901234567890",
      tokenReward: "2000000000000000000", // 2 tokens in wei
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      maxResponses: "100",
      minimumResponseTime: "60",
      tags: ["UX", "Feedback", "DApp"],
      responses: [],
    });
    
    // Update totalParticipants and averageCompletionTime after creation
    this.surveys.forEach((survey: Survey) => {
      survey.totalParticipants = Math.floor(Math.random() * 100);
      survey.averageCompletionTime = Math.floor(Math.random() * 10) + 1;
    });

    // ... (other sample surveys)

    console.log("Sample surveys created:", survey1 /*, survey2, survey3 */);
    console.log("MockDataStore initialized with surveys:", this.surveys);
  }

  getSurveyById(id: string): Survey | undefined {
    console.log('Searching for survey with id:', id);
    const survey = this.surveys.find(s => s.id === id);
    console.log('Found survey:', survey);
    return survey;
  }

  createSurvey(surveyData: Omit<Survey, 'id' | 'totalParticipants' | 'averageCompletionTime'>): Survey {
    const newSurvey: Survey = {
      ...surveyData,
      id: uuidv4(),
      responses: [],
      totalParticipants: 0,
      averageCompletionTime: 0
    };
    this.surveys.push(newSurvey);
    console.log('New survey created:', newSurvey);
    this.saveState();
    return newSurvey;
  }

  private saveState() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mockDataStore', JSON.stringify({
        surveys: this.surveys,
        userRewards: this.userRewards,
      }));
    }
  }

  private loadState() {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('mockDataStore');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        this.surveys = parsedState.surveys;
        this.userRewards = parsedState.userRewards;
      }
    }
  }

  getAllSurveys(): Survey[] {
    console.log('Returning all surveys:', this.surveys);
    return this.surveys;
  }

  getSurveysByCreator(creatorAddress: string): Survey[] {
    return this.surveys.filter(survey => survey.creator === creatorAddress);
  }

  addSurveyResponse(surveyId: string, response: { respondent: string; encryptedAnswers: string; completionTime: number }) {
    const survey = this.getSurveyById(surveyId);
    if (survey) {
      survey.responses.push({ respondent: response.respondent, encryptedAnswers: response.encryptedAnswers });
      survey.totalParticipants += 1;
      survey.averageCompletionTime = (survey.averageCompletionTime * (survey.totalParticipants - 1) + response.completionTime) / survey.totalParticipants;
    }
  }

  getUserRewards(address: string): string {
    return this.userRewards[address] || "0";
  }

  addUserRewards(address: string, amount: string) {
    const currentRewards = BigInt(this.getUserRewards(address));
    const newRewards = currentRewards + BigInt(amount);
    this.userRewards[address] = newRewards.toString();
  }
}


export const mockDataStore = new MockDataStore();