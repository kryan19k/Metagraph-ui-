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
      tokenReward: "2000000000000000000" // 2 tokens in wei
    });

    const survey2 = this.createSurvey({
      title: "Comparison of Decentralized Survey Platforms",
      description: "Share your experiences with different decentralized survey platforms.",
      questions: [
        {
          id: uuidv4(),
          text: "Which of the following decentralized survey platforms have you used?",
          type: "checkbox",
          options: ["SurveyChain", "DecentralSurvey", "BlockSurvey", "CryptoOpinion", "None of the above"]
        },
        {
          id: uuidv4(),
          text: "How would you rate the user interface of SurveyChain compared to other platforms?",
          type: "radio",
          options: ["Much worse", "Slightly worse", "About the same", "Slightly better", "Much better"]
        },
        {
          id: uuidv4(),
          text: "What unique feature of SurveyChain sets it apart from other platforms?",
          type: "text"
        },
        {
          id: uuidv4(),
          text: "On a scale of 1-10, how satisfied are you with the token reward system in SurveyChain?",
          type: "scale",
          min: 1,
          max: 10
        }
      ],
      creator: "0x1234567890123456789012345678901234567890",
      tokenReward: "2500000000000000000" // 2.5 tokens in wei
    });

    const survey3 = this.createSurvey({
      title: "Blockchain Technology Adoption Survey",
      description: "Help us understand the adoption and perception of blockchain technology.",
      questions: [
        {
          id: uuidv4(),
          text: "How familiar are you with blockchain technology?",
          type: "radio",
          options: ["Not at all familiar", "Slightly familiar", "Moderately familiar", "Very familiar", "Extremely familiar"]
        },
        {
          id: uuidv4(),
          text: "Which blockchain platforms have you used? (Select all that apply)",
          type: "checkbox",
          options: ["Ethereum", "Binance Smart Chain", "Polkadot", "Cardano", "Solana", "Other"]
        },
        {
          id: uuidv4(),
          text: "What do you think is the biggest advantage of blockchain technology?",
          type: "radio",
          options: ["Decentralization", "Transparency", "Security", "Immutability", "Smart Contracts"]
        },
        {
          id: uuidv4(),
          text: "In your opinion, what is the biggest challenge for widespread blockchain adoption?",
          type: "text"
        },
        {
          id: uuidv4(),
          text: "How likely are you to invest in blockchain projects in the next 12 months?",
          type: "scale",
          min: 1,
          max: 5
        }
      ],
      creator: "0x1234567890123456789012345678901234567890",
      tokenReward: "3000000000000000000" // 3 tokens in wei
    });

    console.log("Sample surveys created:", survey1, survey2, survey3);
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
    };
    this.surveys.push(newSurvey);
    console.log('New survey created:', newSurvey);
    return newSurvey;
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