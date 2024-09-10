export interface StargazerWallet {
  address: string | null;
  balance: number | null;
  connect: (privateKey: string) => Promise<void>;
  sendDAG: (toAddress: string, amount: number) => Promise<string>;
}