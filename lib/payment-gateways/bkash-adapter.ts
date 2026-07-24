import {
  IPaymentGatewayAdapter,
  PaymentInitParams,
  PaymentInitResult,
  PaymentVerifyResult,
} from "./gateway-interface";

export class BkashPaymentAdapter implements IPaymentGatewayAdapter {
  readonly gatewayName = "bKash";

  async initiatePayment(params: PaymentInitParams): Promise<PaymentInitResult> {
    // bKash Merchant API integration stub ready for live credentials
    return {
      success: true,
      gatewayName: this.gatewayName,
      paymentUrl: `https://checkout.sandbox.bKash.com/payment/${params.orderId}`,
      transactionId: `BKASH-${Date.now()}`,
    };
  }

  async verifyPayment(transactionId: string): Promise<PaymentVerifyResult> {
    return {
      success: true,
      transactionId,
      amount: 100,
      status: "COMPLETED",
      reference: "CampusPay Student Deposit",
    };
  }
}
