import { useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { useEffect } from "react";

/**
 * Custom hook for contract write operations and transaction management
 */
export function useContractWrite() {
  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useWriteContract();

  const chainId = useChainId();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isReceiptError,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    chainId,
    hash,
  });

  // Environment and chain debug
  useEffect(() => {
    console.log(
      "[useContractWrite] chainId:",
      chainId,
      "rpc:",
      process.env.NEXT_PUBLIC_RPC_URL,
      "paymaster:",
      process.env.NEXT_PUBLIC_PAYMASTER_URL
    );
  }, [chainId]);

  // Debug logs for transaction lifecycle
  useEffect(() => {
    if (hash) console.log("[useContractWrite] tx hash:", hash);
  }, [hash]);

  useEffect(() => {
    if (isWritePending) console.log("[useContractWrite] isWritePending:", isWritePending);
  }, [isWritePending]);

  useEffect(() => {
    if (isConfirming) console.log("[useContractWrite] isConfirming:", isConfirming);
  }, [isConfirming]);

  useEffect(() => {
    if (isConfirmed) console.log("[useContractWrite] isConfirmed:", isConfirmed);
  }, [isConfirmed]);

  useEffect(() => {
    if (writeError) console.error("[useContractWrite] writeError:", writeError);
  }, [writeError]);

  useEffect(() => {
    if (isReceiptError && receiptError)
      console.error("[useContractWrite] receiptError:", receiptError);
  }, [isReceiptError, receiptError]);

  return {
    writeContract,
    hash,
    isWritePending,
    writeError,
    reset,
    isConfirming,
    isConfirmed,
    isReceiptError,
    receiptError,
  };
}
