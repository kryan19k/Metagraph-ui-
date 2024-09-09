export const storePrivateKey = (surveyId: string, privateKey: string): void => {
  localStorage.setItem(`survey_key_${surveyId}`, privateKey);
};

export const getPrivateKey = (surveyId: string): string | null => {
  return localStorage.getItem(`survey_key_${surveyId}`);
};