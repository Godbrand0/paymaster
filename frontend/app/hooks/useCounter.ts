import { useState } from "react";
import { useWallet } from "./useWallet";
import { useCounterContract } from "./useCounterContract";
import { useContractWrite } from "./useContractWrite";
import { useCounterActions } from "./useCounterActions";

/**
 * Main custom hook that combines all counter functionality
 */
export function useCounter() {
  // Input state
  const [inputValue, setInputValue] = useState("");

  // Wallet and network management
  const wallet = useWallet();

  // Contract read operations
  const { counterValue, refetch } = useCounterContract(wallet.isCorrectNetwork);

  // Contract write operations
  const contractWrite = useContractWrite();

  // Counter-specific actions
  const { handleIncrement, handleDecrement, handleSetNumber } = useCounterActions({
    isConnected: wallet.isConnected,
    isCorrectNetwork: wallet.isCorrectNetwork,
    writeContract: contractWrite.writeContract,
    isConfirmed: contractWrite.isConfirmed,
    refetch,
    reset: contractWrite.reset,
  });

  // Enhanced set number handler that clears input
  const handleSetNumberWithClear = () => {
    handleSetNumber(inputValue);
    setInputValue("");
  };

  return {
    // Input management
    inputValue,
    setInputValue,
    
    // Wallet state
    ...wallet,
    
    // Contract state
    counterValue,
    
    // Transaction state
    ...contractWrite,
    
    // Actions
    handleIncrement,
    handleDecrement,
    handleSetNumber: handleSetNumberWithClear,
  };
}
