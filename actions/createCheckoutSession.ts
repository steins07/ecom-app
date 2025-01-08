'use server'

import imageUrl from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { IBasketItem } from "@/store/store";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
    mode: string;
}

export type GroupedBasketItem = {
    product: IBasketItem['product'];
    quantity: number;
}

export default async function createCheckoutSession(items: GroupedBasketItem[], metadata: Metadata) {
    try {
        const itemsWithoutPrice = items.filter((item) => !item.product.price);
        if (itemsWithoutPrice.length > 0) {
            throw new Error(`Price not found for product ${itemsWithoutPrice[0].product.name}`);
        }

        const customer = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        })
        let customerId: string | undefined;
        if (customer.data.length > 0) {
            customerId = customer.data[0].id;
        }
        const baseUrl =
            process.env.NODE_ENV === "production"
                ? `https://${process.env.VERCEL_URL}`
                : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
        const cancelUrl = `${baseUrl}/basket`;
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : 'always',
            customer_email: customerId ? metadata.customerEmail : undefined,
            allow_promotion_codes: true,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: items.map((item) => ({
                price_data: {
                    currency: 'usd',
                    unit_amount: Math.round(item.product.price! * 100),
                    product_data: {
                        name: item.product.name || "Unnammed Product",
                        description: `Product ID: ${item.product._id}`,
                        metadata: {
                            id: item.product._id,
                        },
                        images: item.product.image ?
                            [imageUrl(item.product.image).url()] : undefined,
                    },
                },
                quantity: item.quantity,
            })),
        });
return session.url;

    } catch (error) {
        console.error("Error creating checkout session: ", error);

        throw error;
    }
}