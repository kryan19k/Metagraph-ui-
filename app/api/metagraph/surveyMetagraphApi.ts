/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_METAGRAPH_L0_URL || 'http://localhost:9200';

export const getAllSurveys = async () => {
  const response = await axios.get(`${API_BASE_URL}/surveys`);
  return response.data;
};

export const getSurveyById = async (surveyId: string) => {
  const response = await axios.get(`${API_BASE_URL}/surveys/${surveyId}`);
  return response.data;
};

export const getSurveyResponses = async (surveyId: string) => {
  const response = await axios.get(`${API_BASE_URL}/surveys/${surveyId}/responses`);
  return response.data;
};

export const getSurveysByAddress = async (address: string) => {
  const response = await axios.get(`${API_BASE_URL}/addresses/${address}/surveys`);
  return response.data;
};

export const decryptSurveyResponses = async (surveyId: string, accessKey: string) => {
  const response = await axios.post(`${API_BASE_URL}/surveys/${surveyId}/decrypt`, { accessKey });
  return response.data;
};

export const createSurvey = async (surveyData: any) => {
  const response = await axios.post(`${API_BASE_URL}/data`, {
    action: 'createSurvey',
    ...surveyData,
  });
  return response.data;
};

export const submitSurveyResponse = async (surveyId: string, responseData: any) => {
  const response = await axios.post(`${API_BASE_URL}/data`, {
    action: 'submitResponse',
    surveyId,
    ...responseData,
  });
  return response.data;
};