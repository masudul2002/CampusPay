import {
  IPaymentGatewayAdapter,
  PaymentInitParams,
  PaymentInitResult,
  PaymentVerifyResult,
} from "./gateway-interface";

export class SSLCommerzAdapter implements IPaymentGatewayAdapter {
  readonly gatewayName = "SSLCommerz";

  async initiatePayment(params: PaymentInitParams): Promise<PaymentInitResult> {
    return {
      success: true,
      gatewayName: this.gatewayName,
      paymentUrl: `https://sandbox.sslcommerz.com/gwprocess/v4/api.php?gw=${params.orderId}`,
      transactionId: `SSL-${Date.now()}`,
    };
  }

  async verifyPayment(transactionId: string): Promise<PaymentVerifyResult> {
    return {
      success: true,
      transactionId,
      amount: 500,
      status: "COMPLETED",
      reference: "CampusPay SSLCommerz Card Deposit",
    };
  }
}
