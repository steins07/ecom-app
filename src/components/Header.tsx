'use client'

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link";
import Form from 'next/form'
import { ShoppingCart } from 'lucide-react';
import { PackageIcon } from "@sanity/icons";
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) => (
    state.items.reduce(
      (total, item) => total + item.quantity, 0
    )));
  const createClerkPasskey = async () => {
    try {
      const res = await user?.createPasskey();
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <header
      className="flex flex-wrap justify-between items-center py-2 px-4"
    >
      {/* top row */}
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link href="/"
          className="text-xl font-semibold text-blue-400 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          <p>Urban <span className=" text-slate-400 font-bold">Cart
          <svg className=" w-7 h-7 fill-slate-500 inline"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M423.3 440.7c0 25.3-20.3 45.6-45.6 45.6s-45.8-20.3-45.8-45.6 20.6-45.8 45.8-45.8c25.4 0 45.6 20.5 45.6 45.8zm-253.9-45.8c-25.3 0-45.6 20.6-45.6 45.8s20.3 45.6 45.6 45.6 45.8-20.3 45.8-45.6-20.5-45.8-45.8-45.8zm291.7-270C158.9 124.9 81.9 112.1 0 25.7c34.4 51.7 53.3 148.9 373.1 144.2 333.3-5 130 86.1 70.8 188.9 186.7-166.7 319.4-233.9 17.2-233.9z"/></svg>
          </span>
          </p>
        </Link>

        <Form action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search Products..."
            className="bg-gray-100 text-gray-800 py-2 px-4 rounded focus:outline-none focus:opacity-50 focus:ring-blue-500  focus:ring-2 w-full max-w-4xl"
          />
        </Form>
        <div className="flex items-center space-x-4 sm:mt-0 flex-1 sm:flex-none">
          <Link href="/basket"
            className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <ShoppingCart className="w-6 h-6" />
            {/* span for item count */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
              {itemCount}
            </span>
            <span>
              My Basket
            </span>
          </Link>

          {/* user area */}
          <ClerkLoaded>
            <SignedIn>
              <Link href="/orders"
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-6 h-6" />
                <span>
                  My Orders
                </span>
              </Link>
            </SignedIn>

            {user ? (
              <div
                className="flex items-center space-x-2"
              >
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p
                    className="text-gray-400"
                  >
                    Welcome Back
                  </p>
                  <p
                    className="font-bold"
                  >{user.fullName}</p>
                </div>
              </div>) :
              (
                <div className="flex items-center justify-center space-x-2 ">
                  <SignInButton mode="modal" />
                </div>
              )}

            {
              user?.passkeys.length === 0 && (
                <button
                  onClick={createClerkPasskey}
                  className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
                >
                  Create passkey
                </button>
              )
            }
          </ClerkLoaded>
        </div>

      </div>
    </header>
  )
}

export default Header