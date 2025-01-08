import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing environment variable: STRIPE_SECRET_KEY is not set')
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-12-18.acacia",
})
export default stripe;