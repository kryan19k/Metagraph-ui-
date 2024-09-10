"use client"

import { HtmlHTMLAttributes, useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import { useStargazerContext } from "@/components/providers/stargazerprovider"

export const WalletConnect = ({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLSpanElement>) => {
  const { isConnected: isWagmiConnected } = useAccount()
  const stargazerContext = useStargazerContext()

  useEffect(() => {
    if (isWagmiConnected && stargazerContext && !stargazerContext.isConnected) {
      stargazerContext.activate().catch((error) => {
        console.error("Failed to connect Stargazer wallet:", error)
      })
    }
  }, [isWagmiConnected, stargazerContext])

  return (
    <span className={className} {...props}>
      <ConnectButton
        showBalance={false}
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "avatar",
        }}
        chainStatus={{
          smallScreen: "icon",
          largeScreen: "icon",
        }}
      />
    </span>
  )
}
