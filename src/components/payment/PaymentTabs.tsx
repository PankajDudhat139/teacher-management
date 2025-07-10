"use client";
import { FaMobileAlt, FaCreditCard, FaWallet } from "react-icons/fa";

const PAYMENT_TABS = [
  { key: "upi", label: "UPI", icon: <FaMobileAlt /> },
  { key: "card", label: "Debit/Credit Card", icon: <FaCreditCard /> },
  { key: "wallet", label: "Wallet", icon: <FaWallet /> },
];

interface PaymentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function PaymentTabs({ activeTab, onTabChange }: PaymentTabsProps) {
  return (
    <div className="flex w-full mb-4 border-b border-blue-100">
      {PAYMENT_TABS.map((tab) => (
        <button
          key={tab.key}
          className={`cursor-pointer flex-1 flex flex-col items-center py-2 px-1 md:px-2 text-sm font-semibold rounded-t-xl transition
                      ${
                        activeTab === tab.key
                          ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                          : "text-gray-400 hover:text-blue-600"
                      }`}
          onClick={() => onTabChange(tab.key)}
          type="button"
        >
          <span className="mb-1">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}