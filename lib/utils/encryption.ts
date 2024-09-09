import CryptoJS from 'crypto-js';

// Define a type for the answer structure
type Answer = {
  // Add properties that describe the structure of an answer
  // For example:
  question: string;
  response: string;
  // Add other properties as needed
};

export const encryptAnswers = (answers: Answer[], privateKey: string): string => {
  const answersString = JSON.stringify(answers);
  return CryptoJS.AES.encrypt(answersString, privateKey).toString();
};

export const decryptAnswers = (encryptedAnswers: string, privateKey: string): Answer[] => {
  const bytes = CryptoJS.AES.decrypt(encryptedAnswers, privateKey);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString) as Answer[];
};