import { useState, useEffect } from 'react';
import { getAllSurveys, getSurveyById, getSurveyResponses } from '../../app/api/metagraph/surveyMetagraphApi';

export const useSurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const surveysData = await getAllSurveys();
        setSurveys(surveysData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching surveys:', error);
        setLoading(false);
      }
    };

    void fetchSurveys();
  }, []);

  return { surveys, loading };
};

export const useSurveyDetails = (surveyId: string) => {
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const [surveyData, responsesData] = await Promise.all([
          getSurveyById(surveyId),
          getSurveyResponses(surveyId)
        ]);
        setSurvey(surveyData);
        setResponses(responsesData.responses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching survey details:', error);
        setLoading(false);
      }
    };

    if (surveyId) {
      void fetchSurveyDetails();
    }
  }, [surveyId]);

  return { survey, responses, loading };
};