import CryptoJS from 'crypto-js';

// Define a type for the answers
type Answer = string | number | string[];

export const encryptAnswers = (answers: Answer[], privateKey: string): string => {
  const answersString = JSON.stringify(answers);
  return CryptoJS.AES.encrypt(answersString, privateKey).toString();
};

export const decryptAnswers = (encryptedAnswers: string, privateKey: string): Answer[] => {
  const bytes = CryptoJS.AES.decrypt(encryptedAnswers, privateKey);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  const parsedAnswers = JSON.parse(decryptedString);
  
  // Validate the parsed data
  if (!Array.isArray(parsedAnswers)) {
    throw new Error('Decrypted data is not an array');
  }
  
  // Type guard function
  const isValidAnswer = (answer: unknown): answer is Answer => {
    return typeof answer === 'string' || 
           typeof answer === 'number' || 
           (Array.isArray(answer) && answer.every(item => typeof item === 'string'));
  };
  
  // Validate each answer
  if (!parsedAnswers.every(isValidAnswer)) {
    throw new Error('Decrypted data contains invalid answer types');
  }
  
  return parsedAnswers;
};