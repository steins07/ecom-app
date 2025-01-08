import { CUPON_CODES } from "@/sanity/lib/sales/cuponCodes";
import { getActiveSaleByCuponCode } from "@/sanity/lib/sales/getActiveSaleByCuponCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCuponCode(CUPON_CODES.BFRIDAY);
  if (!sale?.isActive) {
    return null;
  }

  return (
    <div
      className="bg-gradient-to-r from-red-600 to-black text-white py-10 px-6 shadow-lg rounded-lg"
    >
      <div
        className="flex items-center justify-between container mx-auto">
        <div className="flex1">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-left mb-4">
            {sale.title}
          </h2>
          <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
            {sale.description}
          </p>
          <div className="flex">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
              <span
                className="font-bold text-base sm:text-xl"
              >
                Use Code:&nbsp;
                <span className="text-red-600">{sale.couponCode}</span>
              </span>
              <span
                className="ml-2 font-bold text-base sm:text-xl"
              >
                For {sale.discountedAmount}% OFF
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default BlackFridayBanner