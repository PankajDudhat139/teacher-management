export interface UpiPayment {
  id: string;
}

export interface CardPayment {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export interface WalletPayment {
  provider: string;
  mobile: string;
}

export type PaymentData = UpiPayment | CardPayment | WalletPayment;