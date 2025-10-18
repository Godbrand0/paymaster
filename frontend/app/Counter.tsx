"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId, useSwitchChain } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { COUNTER_ABI, COUNTER_ADDRESS } from "./counterABI";

export default function Counter() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [inputValue, setInputValue] = useState("");

  const isCorrectNetwork = chainId === baseSepolia.id;

  const { data: counterValue, refetch } = useReadContract({
    address: COUNTER_ADDRESS,
    abi: COUNTER_ABI,
    functionName: "getNumber",
    query: {
      refetchInterval: 3000,
      enabled: isCorrectNetwork && !!COUNTER_ADDRESS,
    },
  });

  const {
    writeContract,
    data: hash,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      refetch();
      // Clear error and reset after successful transaction
      setTimeout(() => reset(), 3000);
    }
  }, [isConfirmed, refetch, reset]);

  const handleIncrement = () => {
    console.log("🚀 Increment clicked");
    console.log("Connected:", isConnected);
    console.log("Correct Network:", isCorrectNetwork);
    console.log("Contract Address:", COUNTER_ADDRESS);
    console.log("Chain ID:", chainId);

    if (!isConnected || !isCorrectNetwork) return;

    try {
      writeContract({
        address: COUNTER_ADDRESS,
        abi: COUNTER_ABI,
        functionName: "increment",
      });
      console.log("✅ Write contract called");
    } catch (error) {
      console.error("❌ Error calling writeContract:", error);
    }
  };

  const handleDecrement = () => {
    if (!isConnected || !isCorrectNetwork) return;

    writeContract({
      address: COUNTER_ADDRESS,
      abi: COUNTER_ABI,
      functionName: "decrement",
    });
  };

  const handleSetNumber = () => {
    if (!isConnected || !isCorrectNetwork || !inputValue) return;

    const value = BigInt(inputValue);
    writeContract({
      address: COUNTER_ADDRESS,
      abi: COUNTER_ABI,
      functionName: "setNumber",
      args: [value],
    });
    setInputValue("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md border border-gray-200">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#0052ff] mb-1">Gasless Counter</h2>
          <p className="text-sm text-gray-500">Sponsored by Paymaster</p>
        </div>

        {/* Counter Display */}
        <div className="bg-[#e6f0ff] border-2 border-[#0052ff] rounded-xl p-4 mb-6 text-center">
          <span className="block text-xs uppercase tracking-wide text-gray-600 mb-2">
            Current Value
          </span>
          <span className="block text-4xl font-bold text-[#0052ff]">
            {counterValue !== undefined && counterValue !== null ? counterValue.toString() : "0"}
          </span>
        </div>

        {/* Connection Status & Debug Info */}
        <div className="mb-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <div>Status: {isConnected ? "✅ Connected" : "❌ Not Connected"}</div>
          <div>Network: {isCorrectNetwork ? "✅ Base Sepolia" : `❌ Wrong (ID: ${chainId})`}</div>
          <div>Address: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "None"}</div>
        </div>

        {/* Wallet Not Connected */}
        {!isConnected ? (
          <div className="bg-[#e6f0ff] text-[#0052ff] p-4 rounded-xl text-center text-sm">
            Please connect your wallet to interact with the counter
          </div>
        ) : !isCorrectNetwork ? (
          /* Wrong Network */
          <div className="bg-orange-50 border-2 border-orange-400 p-4 rounded-xl text-center">
            <p className="text-lg font-bold text-orange-700 mb-2">Wrong Network!</p>
            <p className="text-sm text-gray-600 mb-3">
              Please switch to Base Sepolia (Chain ID: {baseSepolia.id})
            </p>
            <button
              onClick={() => switchChain({ chainId: baseSepolia.id })}
              className="w-full bg-[#0052ff] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0045d9] transition"
            >
              Switch to Base Sepolia
            </button>
          </div>
        ) : (
          /* Connected & Correct Network */
          <>
            {/* Increment/Decrement Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={handleDecrement}
                disabled={isWritePending || isConfirming || !counterValue || counterValue === BigInt(0)}
                className="bg-red-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                <span className="text-2xl font-bold">−</span>
                <span>Decrement</span>
              </button>
              <button
                onClick={handleIncrement}
                disabled={isWritePending || isConfirming}
                className="bg-[#0052ff] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#0045d9] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                <span className="text-2xl font-bold">+</span>
                <span>Increment</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative text-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative">
                <span className="bg-white px-3 text-sm text-gray-500">or set a custom value</span>
              </div>
            </div>

            {/* Set Number Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a number"
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-[#0052ff] transition"
                disabled={isWritePending || isConfirming}
              />
              <button
                onClick={handleSetNumber}
                disabled={!inputValue || isWritePending || isConfirming}
                className="bg-white text-[#0052ff] border-2 border-[#0052ff] px-6 py-2 rounded-lg font-semibold hover:bg-[#e6f0ff] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Set
              </button>
            </div>

            {/* Transaction Status */}
            {(isWritePending || isConfirming) && (
              <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-center text-sm mb-4">
                {isWritePending && "🔄 Preparing transaction..."}
                {isConfirming && "⏳ Confirming transaction..."}
              </div>
            )}

            {isConfirmed && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center text-sm mb-4">
                ✅ Transaction confirmed!
              </div>
            )}

            {writeError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4 break-words">
                ❌ Error: {writeError.message}
              </div>
            )}

            {hash && (
              <div className="text-center mb-4">
                <a
                  href={`https://sepolia.basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0052ff] text-sm underline hover:text-[#0045d9]"
                >
                  View on BaseScan →
                </a>
              </div>
            )}
          </>
        )}

        {/* Contract Info */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">
            Contract Address
          </div>
          <a
            href={`https://sepolia.basescan.org/address/${COUNTER_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#0052ff] break-all hover:underline"
          >
            {COUNTER_ADDRESS}
          </a>
        </div>
      </div>
    </div>
  );
}
