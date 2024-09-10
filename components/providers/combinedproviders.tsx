import { ReactNode } from "react"

import { RainbowKit } from "./rainbow-kit"
import { StargazerProvider } from "./stargazerprovider"

export function CombinedWeb3Provider({ children }: { children: ReactNode }) {
  return (
    <StargazerProvider>
      <RainbowKit>{children}</RainbowKit>
    </StargazerProvider>
  )
}
