import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";


export const getMyOrders = async (userId: string) => {

    if (!userId) {
        throw new Error("userId is required");
    }

    const GET_MY_ORDERS_QUERY = defineQuery(
        `
        *[_type=="order" && clerkUserId == $userId]
        | order(orderDate desc)
        {
        ..., products[]
        {
        ...,product->
        }
        }`
    );
    try {
        const orders = await sanityFetch({
            query: GET_MY_ORDERS_QUERY,
            params: { userId: userId },

        });
        return orders.data || []
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }

}

