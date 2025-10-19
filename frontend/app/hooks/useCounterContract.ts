import { useReadContract } from "wagmi";
import { COUNTER_ABI, COUNTER_ADDRESS } from "../counterABI";

/**
 * Custom hook for reading counter contract data
 */
export function useCounterContract(isCorrectNetwork: boolean) {
  const { data: counterValue, refetch } = useReadContract({
    address: COUNTER_ADDRESS,
    abi: COUNTER_ABI,
    functionName: "getNumber",
    query: {
      refetchInterval: 3000,
      enabled: isCorrectNetwork && !!COUNTER_ADDRESS,
    },
  });

  return {
    counterValue,
    refetch,
  };
}
