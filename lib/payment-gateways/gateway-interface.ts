export interface PaymentInitParams {
  amount: number;
  currency: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  redirectUrl: string;
}

export interface PaymentInitResult {
  success: boolean;
  gatewayName: string;
  paymentUrl?: string;
  transactionId?: string;
  errorMessage?: string;
  rawResponse?: any;
}

export interface PaymentVerifyResult {
  success: boolean;
  transactionId: string;
  amount: number;
  status: "COMPLETED" | "PENDING" | "FAILED";
  reference?: string;
}

export interface IPaymentGatewayAdapter {
  readonly gatewayName: string;
  initiatePayment(params: PaymentInitParams): Promise<PaymentInitResult>;
  verifyPayment(transactionId: string): Promise<PaymentVerifyResult>;
  refundPayment?(transactionId: string, amount: number): Promise<boolean>;
}
