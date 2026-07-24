import {
  IPaymentGatewayAdapter,
  PaymentInitParams,
  PaymentInitResult,
  PaymentVerifyResult,
} from "./gateway-interface";

export class NagadPaymentAdapter implements IPaymentGatewayAdapter {
  readonly gatewayName = "Nagad";

  async initiatePayment(params: PaymentInitParams): Promise<PaymentInitResult> {
    return {
      success: true,
      gatewayName: this.gatewayName,
      paymentUrl: `https://sandbox.nagad.com.bd/checkout/${params.orderId}`,
      transactionId: `NAGAD-${Date.now()}`,
    };
  }

  async verifyPayment(transactionId: string): Promise<PaymentVerifyResult> {
    return {
      success: true,
      transactionId,
      amount: 100,
      status: "COMPLETED",
      reference: "CampusPay Student Nagad Deposit",
    };
  }
}
