import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectMessage({page}: {page: string}) {
  return (
    <div className="flex flex-col items-center py-8">
      <p className="mb-4">Please connect your wallet to view your {page}</p>
      <ConnectButton  />
    </div>
  )
}
