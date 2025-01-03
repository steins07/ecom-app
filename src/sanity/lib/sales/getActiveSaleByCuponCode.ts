import { defineQuery } from "next-sanity";
import { CuponCode } from "./cuponCodes";
import { sanityFetch } from "../live";

export const getActiveSaleByCuponCode = async (cuponCode: CuponCode) => {
    const ACTIVE_SALE_BY_CUPON_QUERY = defineQuery(
        `*[_type=="sale" 
        && isActive == true 
        && couponCode == $cuponCode]
        | order(validForm desc)[0]`
    );

    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_CUPON_QUERY,
            params: { cuponCode: cuponCode },
        });
        return activeSale? activeSale.data : null;
    } catch (error) {
        console.error("Error fetching active sales by cupon code:", error);
        return null;
    }
}
