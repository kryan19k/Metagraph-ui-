import React from "react"

import { WalletConnect } from "@/components/blockchain/wallet-connect"
import { SiteHeader } from "@/components/layout/site-header"

interface InfoLayoutProps {
  children: React.ReactNode
}

export default function InfoLayout({ children }: InfoLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[minmax(0,1fr)] md:gap-6 lg:grid-cols-[minmax(0,1fr)] lg:gap-10">
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr]">
          {children}
        </main>
      </div>
      <div className="fixed bottom-6 right-6">
        <WalletConnect />
      </div>
    </div>
  )
}
