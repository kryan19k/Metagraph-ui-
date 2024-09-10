import { dag4 } from '@stardust-collective/dag4';

export const initializeDag4 = () => {
  dag4.account.connect({
    networkVersion: '2.0',
    testnet: true // Change to false for mainnet
  });
};

export const loginWithPrivateKey = (privateKey: string) => {
  dag4.account.loginPrivateKey(privateKey);
};

export const getAddress = () => {
  return dag4.account.address;
};

export const getBalance = async (address: string) => {
  return await dag4.network.getAddressBalance(address);
};

export const sendTransaction = async (toAddress: string, amount: number, fee: number = 0) => {
  return await dag4.account.transferDag(toAddress, amount, fee);
};
export { dag4 };