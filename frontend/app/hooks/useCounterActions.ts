import { useEffect } from "react";
import { COUNTER_ABI, COUNTER_ADDRESS } from "../counterABI";

interface UseCounterActionsProps {
  isConnected: boolean;
  isCorrectNetwork: boolean;
  writeContract: any;
  isConfirmed: boolean;
  refetch: () => void;
  reset: () => void;
}

/**
 * Custom hook for counter-specific actions (increment, decrement, setNumber)
 */
export function useCounterActions({
  isConnected,
  isCorrectNetwork,
  writeContract,
  isConfirmed,
  refetch,
  reset,
}: UseCounterActionsProps) {
  // Handle successful transactions
  useEffect(() => {
    if (isConfirmed) {
      console.log("[useCounterActions] isConfirmed: true -> refetching and scheduling reset");
      refetch();
      // Clear error and reset after successful transaction
      setTimeout(() => {
        console.log("[useCounterActions] resetting write state after confirm");
        reset();
      }, 3000);
    }
  }, [isConfirmed, refetch, reset]);

  // Debug connection/network state
  useEffect(() => {
    console.log("[useCounterActions] state", { isConnected, isCorrectNetwork });
  }, [isConnected, isCorrectNetwork]);

  const executeContractFunction = (functionName: string, args?: any[]) => {
    if (!isConnected || !isCorrectNetwork) {
      console.warn(
        `[useCounterActions] blocked ${functionName}: isConnected=${isConnected}, isCorrectNetwork=${isCorrectNetwork}`
      );
      return;
    }

    try {
      console.log(`[useCounterActions] invoking ${functionName}`, {
        address: COUNTER_ADDRESS,
        args,
      });
      writeContract({
        address: COUNTER_ADDRESS,
        abi: COUNTER_ABI,
        functionName,
        args,
      });
      console.log(`[useCounterActions] writeContract invoked for ${functionName}`);
    } catch (error) {
      console.error(`[useCounterActions] error calling ${functionName}:`, error);
    }
  };

  const handleIncrement = () => {
    console.log("🚀 Increment clicked");
    executeContractFunction("increment");
  };

  const handleDecrement = () => {
    console.log("🚀 Decrement clicked");
    executeContractFunction("decrement");
  };

  const handleSetNumber = (value: string) => {
    if (!value) return;
    
    console.log("🚀 Set Number clicked");
    const bigIntValue = BigInt(value);
    executeContractFunction("setNumber", [bigIntValue]);
  };

  return {
    handleIncrement,
    handleDecrement,
    handleSetNumber,
  };
}
