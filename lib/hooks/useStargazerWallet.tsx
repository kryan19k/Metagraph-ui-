import { useStargazerWallet } from "@stardust-collective/web3-react-stargazer-connector"

export type StargazerEIPProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  // Add other properties as needed
}

export type IStargazerWalletHookState = {
  activate: () => Promise<void>
  deactivate: () => Promise<void>
} & (
  | {
      active: true
      account: string
      provider: StargazerEIPProvider
      request: StargazerEIPProvider["request"]
    }
  | { active: false }
)

export function useStargazer() {
  const stargazerWalletState = useStargazerWallet()
  const { activate, deactivate, ...state }: IStargazerWalletHookState =
    stargazerWalletState

  return {
    activate,
    deactivate,
    ...state,
    isConnected: state.active,
    address: state.active ? state.account : undefined,
  }
}
