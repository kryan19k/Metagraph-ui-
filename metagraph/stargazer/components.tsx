/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from "react"

import { useStargazerWallet } from "./hooks"

export const ConnectWallet: React.FC = () => {
  const [privateKey, setPrivateKey] = useState("")
  const { connect } = useStargazerWallet()

  const handleConnect = () => {
    void connect(privateKey)
  }

  return (
    <div>
      <input
        type="password"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        placeholder="Enter private key"
      />
      <button onClick={handleConnect}>Connect Wallet</button>
    </div>
  )
}

export const WalletInfo: React.FC = () => {
  const { address, balance } = useStargazerWallet()

  if (!address) return null

  return (
    <div>
      <p>Address: {address}</p>
      <p>Balance: {balance} DAG</p>
    </div>
  )
}

export const SendDAG: React.FC = () => {
  const [toAddress, setToAddress] = useState("")
  const [amount, setAmount] = useState("")
  const { sendDAG } = useStargazerWallet()

  const handleSend = async () => {
    try {
      const txHash = await sendDAG(toAddress, parseFloat(amount))
      alert(`Transaction sent: ${txHash}`)
    } catch (error: any) {
      alert(`Error sending transaction: ${error.message}`)
    }
  }

  return (
    <div>
      <input
        type="text"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        placeholder="To Address"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleSend}>Send DAG</button>
    </div>
  )
}
