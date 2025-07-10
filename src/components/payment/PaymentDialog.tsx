"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import PaymentTabs from "./PaymentTabs";
import PaymentForm from "./PaymentForm";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  subject: string;
  amount: number;
  onPaymentSuccess?: () => void;
}

export default function PaymentDialog({
  isOpen,
  onClose,
  teacherName,
  subject,
  amount,
  onPaymentSuccess,
}: PaymentDialogProps) {
  const [activeTab, setActiveTab] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (paymentData: any) => {
    setError(null);
    setSuccess(false);
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 1500);
    }, 1200);
  };

  const handleClose = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
    setActiveTab("upi");
    onClose();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-40">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-lg relative animate-fadeIn">
        <button
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={handleClose}
          aria-label="Close"
        >
          <FaTimes size={22} />
        </button>
        
        <div className="flex flex-col items-center">
          <img
            src="/payment.svg"
            alt="Payment"
            className="w-16 h-16 mb-2 text-blue-800"
          />
          <div className="inline-block rounded-full bg-blue-100 text-blue-700 px-5 py-2 mb-2 font-bold text-lg shadow-sm">
            Pay ₹{amount}
          </div>
          <p className="mb-4 text-gray-600 text-center text-xl">
            to <span className="font-semibold">{teacherName}</span> for{" "}
            <span className="font-semibold">{subject}</span>
          </p>
          
          <PaymentTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="w-full">
            {error && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg mb-2 text-sm text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 text-green-700 px-3 py-2 rounded-lg mb-2 text-sm text-center">
                Payment Successful! (Demo)
              </div>
            )}
            
            <PaymentForm
              activeTab={activeTab}
              amount={amount}
              loading={loading}
              onPayment={handlePayment}
              onError={setError}
            />
          </div>
          
          <div className="mt-4 text-xs text-gray-400 text-center">
            Secure • Modern Payments • Mobile Friendly
          </div>
        </div>
      </div>
    </div>
  );
}