/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory data store
const surveys = new Map();
const responses = new Map();
const rewards = new Map();

// Create Survey
app.post('/api/surveys', (req, res) => {
  const { creator, questions, tokenReward, imageUri, endTime, maxResponses, minimumResponseTime, tags } = req.body;
  const surveyId = uuidv4();
  const privateKey = crypto.randomBytes(32).toString('hex');
  
  surveys.set(surveyId, { 
    id: surveyId, 
    creator, 
    questions, 
    tokenReward, 
    imageUri, 
    endTime, 
    maxResponses, 
    minimumResponseTime, 
    tags,
    privateKey 
  });
  
  res.status(201).json({ surveyId, privateKey });
});
// Get Survey
app.get('/api/surveys/:surveyId', (req, res) => {
  const survey = surveys.get(req.params.surveyId);
  if (!survey) {
    return res.status(404).json({ error: 'Survey not found' });
  }
  
  const { privateKey, ...surveyData } = survey;
  surveyData.responseCount = (responses.get(req.params.surveyId) || []).length;
  
  res.json(surveyData);
});

// Submit Response
app.post('/surveys/:surveyId/responses', (req, res) => {
  const { respondent, encryptedAnswers } = req.body;
  const surveyId = req.params.surveyId;
  
  if (!surveys.has(surveyId)) {
    return res.status(404).json({ error: 'Survey not found' });
  }
  
  const responseId = uuidv4();
  const surveyResponses = responses.get(surveyId) || [];
  surveyResponses.push({ id: responseId, respondent, encryptedAnswers });
  responses.set(surveyId, surveyResponses);
  
  // Update rewards
  const reward = BigInt(surveys.get(surveyId).tokenReward);
  rewards.set(respondent, (rewards.get(respondent) || BigInt(0)) + reward);
  
  res.status(201).json({ responseId });
});

// Get Survey Statistics
app.get('/statistics', (req, res) => {
  const totalSurveys = surveys.size;
  const totalResponses = Array.from(responses.values()).reduce((acc, curr) => acc + curr.length, 0);
  const totalRewardsDistributed = Array.from(rewards.values()).reduce((acc, curr) => acc + curr, BigInt(0));
  
  res.json({ totalSurveys, totalResponses, totalRewardsDistributed: totalRewardsDistributed.toString() });
});

// Get User Rewards
app.get('/rewards/:address', (req, res) => {
  const address = req.params.address;
  const rewardBalance = rewards.get(address) || BigInt(0);
  
  res.json({ address, rewardBalance: rewardBalance.toString() });
});

// Withdraw Rewards
app.post('/withdraw', (req, res) => {
  const { address, amount } = req.body;
  const currentBalance = rewards.get(address) || BigInt(0);
  const withdrawAmount = BigInt(amount);
  
  if (withdrawAmount > currentBalance) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }
  
  rewards.set(address, currentBalance - withdrawAmount);
  const transactionId = crypto.randomBytes(32).toString('hex');
  
  res.json({ transactionId });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Mock server running on port ${PORT}`));