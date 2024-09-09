import { v4 as uuidv4 } from 'uuid';

export interface Survey {
  id: string;
  creator: string;
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
  private static instance: MockDataStore;
  private surveys: Map<string, Survey> = new Map();
  private userSurveys: Map<string, string[]> = new Map();
  private userRewards: { [address: string]: string } = {};

  private constructor() {
    console.log("Initializing MockDataStore");
    this.loadState();
    if (this.surveys.size === 0) {
      this.initializeSampleSurveys();
    }
    console.log("MockDataStore initialized with surveys:", this.surveys);
  }

  public static getInstance(): MockDataStore {
    if (!MockDataStore.instance) {
      MockDataStore.instance = new MockDataStore();
    }
    return MockDataStore.instance;
  }
  
  private initializeSampleSurveys() {
    const sampleCreator = "0x1234567890123456789012345678901234567890";
    this.createSurvey({
      creator: sampleCreator,
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
      tokenReward: "20",
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      maxResponses: "100",
      minimumResponseTime: "60",
      tags: ["UX", "Feedback", "DApp"],
    });
  }

  getSurveyById(id: string): Survey | undefined {
    console.log('Searching for survey with id:', id);
    console.log('All surveys:', Array.from(this.surveys.entries()));
    const survey = this.surveys.get(id);
    console.log('Found survey:', survey);
    return survey;
  }

  createSurvey(surveyData: Omit<Survey, 'id' | 'responses' | 'totalParticipants' | 'averageCompletionTime'>): Survey {
    const newSurvey: Survey = {
      ...surveyData,
      id: uuidv4(),
      responses: [],
      totalParticipants: 0,
      averageCompletionTime: 0
    };
    this.surveys.set(newSurvey.id, newSurvey);
    
    const creatorSurveys = this.userSurveys.get(surveyData.creator) || [];
    creatorSurveys.push(newSurvey.id);
    this.userSurveys.set(surveyData.creator, creatorSurveys);
    
    this.saveState();
    console.log('Created new survey:', newSurvey);
    console.log('All surveys after creation:', this.surveys);
    return newSurvey;
  }

  private saveState() {
    if (typeof window !== 'undefined') {
      const state = {
        surveys: Array.from(this.surveys.entries()),
        userSurveys: Array.from(this.userSurveys.entries()),
        userRewards: this.userRewards,
      };
      localStorage.setItem('mockDataStore', JSON.stringify(state));
    }
    // For server-side persistence (this is a mock, in a real app you'd use a database)
    console.log('Saving state:', this.surveys);
  }

  private loadState() {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('mockDataStore');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        this.surveys = new Map(parsedState.surveys);
        this.userSurveys = new Map(parsedState.userSurveys);
        this.userRewards = parsedState.userRewards;
      }
    }
    // For server-side loading (this is a mock, in a real app you'd load from a database)
    console.log('Loading state:', this.surveys);
  }


  getAllSurveys(): Survey[] {
    return Array.from(this.surveys.values());
  }

  getSurveysByCreator(creatorAddress: string): Survey[] {
    const surveyIds = this.userSurveys.get(creatorAddress) || [];
    return surveyIds.map(id => this.surveys.get(id)).filter((survey): survey is Survey => survey !== undefined);
  }

  addSurveyResponse(surveyId: string, response: { respondent: string; encryptedAnswers: string; completionTime: number }) {
    const survey = this.getSurveyById(surveyId);
    if (survey) {
      survey.responses.push({ respondent: response.respondent, encryptedAnswers: response.encryptedAnswers });
      survey.totalParticipants += 1;
      survey.averageCompletionTime = (survey.averageCompletionTime * (survey.totalParticipants - 1) + response.completionTime) / survey.totalParticipants;
      this.saveState();
    }
  }

  getUserRewards(address: string): string {
    return this.userRewards[address] || "0";
  }

  addUserRewards(address: string, amount: string) {
    const currentRewards = BigInt(this.getUserRewards(address));
    const newRewards = currentRewards + BigInt(amount);
    this.userRewards[address] = newRewards.toString();
    this.saveState();
  }
}

export const mockDataStore = MockDataStore.getInstance();

declare global {
  const mockDataStore: {
    getSurveyById(id: string): Survey | undefined;
    createSurvey(surveyData: Omit<Survey, 'id' | 'responses' | 'totalParticipants' | 'averageCompletionTime'>): Survey;
    getAllSurveys(): Survey[];
    addSurveyResponse(surveyId: string, response: { respondent: string; encryptedAnswers: string; completionTime: number }): void;
  };
}


if (typeof window === 'undefined') {
  (global as any).mockDataStore = mockDataStore;
}