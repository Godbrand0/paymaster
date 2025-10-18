"use client";
import { Wallet } from "@coinbase/onchainkit/wallet";
import Counter from "./Counter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#0052ff]">Gasless Counter</h1>
          <Wallet />
        </div>
      </header>

      <main className="flex-1 pt-20">
        <Counter />
      </main>

      <footer className="px-6 py-6 text-center border-t border-gray-200 bg-white/80">
        <p className="text-sm text-gray-600">
          Powered by <span className="text-[#0052ff] font-semibold">Base</span> and <span className="text-[#0052ff] font-semibold">OnchainKit</span>
        </p>
      </footer>
    </div>
  );
}
