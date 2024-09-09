import CryptoJS from 'crypto-js';

export const encryptAnswers = (answers: any[], privateKey: string): string => {
  const answersString = JSON.stringify(answers);
  return CryptoJS.AES.encrypt(answersString, privateKey).toString();
};

export const decryptAnswers = (encryptedAnswers: string, privateKey: string): any[] => {
  const bytes = CryptoJS.AES.decrypt(encryptedAnswers, privateKey);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
};