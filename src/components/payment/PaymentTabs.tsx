"use client";

const PAYMENT_TABS = [
  {
    key: "upi",
    label: "UPI",
    icon: "https://logodix.com/logo/1763566.png",
  },
  {
    key: "card",
    label: "Debit/Credit Card",
    icon: "https://www.svgrepo.com/show/56172/credit-card-payment.svg",
  },
  {
    key: "wallet",
    label: "Wallet",
    icon: "https://www.svgrepo.com/show/30601/wallet.svg",
  },
];

interface PaymentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function PaymentTabs({
  activeTab,
  onTabChange,
}: PaymentTabsProps) {
  return (
    <div className="flex w-full mb-4 border-b border-blue-100">
      {PAYMENT_TABS.map((tab) => (
        <button
          key={tab.key}
          className={`cursor-pointer flex-1 flex flex-col justify-center items-center py-2 px-1 md:px-2 text-sm font-semibold rounded-t-xl transition
                      ${
                        activeTab === tab.key
                          ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                          : "text-gray-400 hover:text-blue-600"
                      }`}
          onClick={() => onTabChange(tab.key)}
          type="button"
        >
          <span className="mb-1">
            <img
              src={tab.icon}
              className="w-16 h-auto"
              alt=""
              style={{ maxHeight: "26px" }}
            />
          </span>
        </button>
      ))}
    </div>
  );
}
