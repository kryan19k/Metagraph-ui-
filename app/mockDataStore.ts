import { v4 as uuidv4 } from 'uuid';

export interface Survey {
  id: string;
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
  creator: string;
  tokenReward: string;
  endTime: string;
  maxResponses: string;
  minimumResponseTime: string;
  tags: string[];
  responses: Array<{
    respondent: string;
    encryptedAnswers: string;
  }>;
}

class MockDataStore {
  private surveys: Survey[] = [];
  private userRewards: { [address: string]: string } = {};

  constructor() {
    console.log("Initializing MockDataStore");
    this.initializeSampleSurveys();
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
      responses: []
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

  createSurvey(surveyData: Omit<Survey, 'id'>): Survey {
    const newSurvey: Survey = {
      ...surveyData,
      id: uuidv4(),
      responses: surveyData.responses || []
    };
    this.surveys.push(newSurvey);
    console.log('New survey created:', newSurvey);
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