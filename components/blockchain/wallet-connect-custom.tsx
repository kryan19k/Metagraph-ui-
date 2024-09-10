"use client"

import { HTMLAttributes, useEffect } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

import { useStargazerContext } from "@/components/providers/stargazerprovider"

import { Button } from "../ui/button"

interface WalletConnectCustomProps extends HTMLAttributes<HTMLDivElement> {
  classNameConnect?: string
  classNameConnected?: string
  classNameWrongNetwork?: string
  labelConnect?: string
  labelWrongNetwork?: string
}

export const WalletConnectCustom: React.FC<WalletConnectCustomProps> = ({
  className,
  labelConnect = "Connect Wallet",
  labelWrongNetwork = "Wrong Network",
  ...props
}: WalletConnectCustomProps) => {
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
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
      }) => {
        const connected =
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div className={className} {...props}>
            {(() => {
              if (!connected) {
                return (
                  <>
                    <Button variant="default" onClick={openConnectModal}>
                      {labelConnect}
                    </Button>
                  </>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button variant="destructive" onClick={openChainModal}>
                    {labelWrongNetwork}
                  </Button>
                )
              }

              return (
                <div>
                  <Button variant="default" onClick={openChainModal}>
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 18, height: 18 }}
                          />
                        )}
                      </div>
                    )}
                    <span className="ml-1 text-lg lowercase">{chain.name}</span>
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default WalletConnectCustom
