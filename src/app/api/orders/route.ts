import {NextRequest, NextResponse} from "next/server";
import paypal from "@paypal/checkout-server-sdk";

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

if (!clientId || !clientSecret) {
    throw new Error("Missing PayPal client ID or secret");
}

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: NextRequest) {
    const request = new paypal.orders.OrdersCreateRequest();
    const { cart } = await req.json();

    const total = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'BRL',
                    value: total.toFixed(2),
                },
            },
        ],
    });

    const response = await client.execute(request);

    return NextResponse.json({ id: response.result.id });
}
