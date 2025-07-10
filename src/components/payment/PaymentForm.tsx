"use client";
import { useState } from "react";
import UpiPaymentForm from "./UpiPaymentForm";
import CardPaymentForm from "./CardPaymentForm";
import WalletPaymentForm from "./WalletPaymentForm";
import type {
  UpiPayment,
  CardPayment,
  WalletPayment,
  PaymentData,
} from "@/types/payment";

interface PaymentFormProps {
  activeTab: string;
  amount: number;
  loading: boolean;
  onPayment: (data: PaymentData) => void;
  onError: (error: string) => void;
}

export default function PaymentForm({
  activeTab,
  amount,
  loading,
  onPayment,
  onError,
}: PaymentFormProps) {
  const [formData, setFormData] = useState({
    upi: { id: "" } as UpiPayment,
    card: { number: "", name: "", expiry: "", cvv: "" } as CardPayment,
    wallet: { provider: "", mobile: "" } as WalletPayment,
  });

  const validateAndPay = () => {
    onError("");

    if (activeTab === "upi") {
      if (!/^[\w.-]+@[\w.-]+$/.test(formData.upi.id)) {
        onError("Enter a valid UPI ID (e.g. name@upi)");
        return;
      }
    }

    if (activeTab === "card") {
      const { number, name, expiry, cvv } = formData.card;
      if (
        !/^\d{16}$/.test(number.replace(/\s/g, "")) ||
        !name.trim() ||
        !/^\d{2}\/\d{2}$/.test(expiry) ||
        !/^\d{3,4}$/.test(cvv)
      ) {
        onError("Enter valid card details.");
        return;
      }
    }

    if (activeTab === "wallet") {
      const { provider, mobile } = formData.wallet;
      if (!provider || !/^\d{10}$/.test(mobile)) {
        onError("Enter valid wallet details.");
        return;
      }
    }

    onPayment(formData[activeTab as keyof typeof formData]);
  };

  const updateFormData = <T extends keyof typeof formData>(
    tab: T,
    data: (typeof formData)[T]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [tab]: data,
    }));
  };

  const renderPaymentForm = () => {
    switch (activeTab) {
      case "upi":
        return (
          <UpiPaymentForm
            data={formData.upi}
            onChange={(data) => updateFormData("upi", data)}
            onSubmit={validateAndPay}
            loading={loading}
            amount={amount}
          />
        );
      case "card":
        return (
          <CardPaymentForm
            data={formData.card}
            onChange={(data) => updateFormData("card", data)}
            onSubmit={validateAndPay}
            loading={loading}
            amount={amount}
          />
        );
      case "wallet":
        return (
          <WalletPaymentForm
            data={formData.wallet}
            onChange={(data) => updateFormData("wallet", data)}
            onSubmit={validateAndPay}
            loading={loading}
            amount={amount}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderPaymentForm()}</>;
}
