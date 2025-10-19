import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { baseSepolia } from "wagmi/chains";

/**
 * Custom hook for wallet connection and network management
 */
export function useWallet() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const isCorrectNetwork = chainId === baseSepolia.id;

  const switchToBaseSepolia = () => {
    switchChain({ chainId: baseSepolia.id });
  };

  return {
    // Wallet connection
    address,
    isConnected,
    
    // Network management
    chainId,
    isCorrectNetwork,
    switchToBaseSepolia,
  };
}
