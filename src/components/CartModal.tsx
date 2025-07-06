"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";

const CartModal = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
  // TEMPORARY
  // const cartItems = true;

  const wixClient = useWixClient();

  const [price, setPrice] = useState<number>(0);
  const { cart, isLoading, removeItem } = useCartStore();

  useEffect(() => {
    let totalAmount = cart.lineItems?.reduce((total, item) => {
      const quantity = item.quantity || 1;
      const price = Number(item.price?.amount) || 0;
      return total + quantity * price;
    }, 0) || 0;
    setPrice(totalAmount);
  }, [cart]);

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-[99999]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-600/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Desktop: slide from right */}
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 hidden md:flex">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform animate-slideInRight duration-300 transition data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                {(cart.lineItems?.length === 0 || !cart.lineItems) ? (
                  <div className="flex flex-col justify-center items-center w-full">
                    <h2 className="title font-manrope font-bold text-4xl mb-3 leading-10 text-center text-black/80">Shopping Cart</h2>
                    <Image
                      src={'/empty-cart.png'}
                      alt="empty-cart"
                      width={350}
                      height={350}
                    />
                    <h2 className="title font-manrope font-light text-2xl leading-10 text-center text-black/80">Cart is empty!</h2>
                    <Link
                      onClick={() => setOpen(false)}
                      href='/list?cat=featured'
                      className="p-3 mt-3 rounded-md bg-lama text-white hover:bg-lama/80">Shop Now</Link>
                  </div>
                ) : (
                  <section className="py-8 relative">
                    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                      <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black/80">Shopping Cart
                      </h2>
                      {cart.lineItems?.map((item) => (
                        <div key={item._id} className="rounded-lg border border-gray-200 p-3 lg:p-4 grid grid-cols-12 mb-3 max-lg:max-w-lg max-lg:mx-auto gap-y-4">
                          <div className="col-span-4 img box">
                            {item.image && (
                              <Image
                                src={wixMedia.getScaledToFillImageUrl(
                                  item.image,
                                  124,
                                  124,
                                  {}
                                )}
                                alt=""
                                width={124}
                                height={124}
                                className="object-cover rounded-md"
                              />
                            )}
                          </div>
                          <div className="col-span-8 detail w-full pl-3">
                            <div className="flex items-center justify-between gap-2 w-full">
                              <h5 className="font-manrope font-bold text-base leading-2 text-gray-900/80">{item.productName?.original}</h5>
                              <button style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                                onClick={() => removeItem(wixClient, item._id!)} className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
                                <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <circle className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                                    cx="17" cy="17" r="17" fill="" />
                                  <path className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                                    d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                                    stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
                                </svg>
                              </button>
                            </div>
                            {(item?.descriptionLines?.length ?? 0) > 0 && (
                              <div className="flex justify-between items-center">
                                <h6 className="text-gray-500 font-light text-sm mt-2 tracking-wider leading-2">
                                  {item.descriptionLines?.[0]?.name?.original ?? ""}: {item.descriptionLines?.[0]?.plainText?.original ?? ""}
                                </h6>
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <h6 className="text-gray-500 font-light text-sm mt-2 tracking-wider leading-2">Quantity: {item.quantity}</h6>
                            </div>
                            <div className="flex justify-between items-center">
                              <h6 className="text-lama/80 font-manrope font-bold text-2xl leading-9 text-right">₹ {item.price?.amount}</h6>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex flex-row items-center justify-between px-3 pb-3 md:px-6 md:pb-6 border-b border-gray-200">
                        <h5 className="text-gray-900 flex justify-center items-center font-manrope font-semibold text-3xl leading-9 max-md:text-center">Subtotal</h5>
                        <div className="flex flex-row">
                          <h6 className="font-manrope font-bold text-3xl text-lama">₹ {price}</h6>
                        </div>
                      </div>
                      <div className="max-lg:max-w-lg max-lg:mx-auto">
                        <p className="font-normal text-xs md:text-sm leading-7 text-gray-500 text-center mb-5 mt-6">Shipping and discounts
                          are calculated
                          at checkout.</p>
                        <button
                          disabled={isLoading}
                          onClick={handleCheckout}
                          className="rounded-full py-4 px-6 bg-lama text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-lama/80 ">
                          Checkout</button>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </DialogPanel>
          </div>

          {/* Mobile: slide from bottom */}
          <div className="pointer-events-none fixed inset-x-0 bottom-0 flex md:hidden z-50">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-h-[90vh] transform animate-slideInBottom duration-300 transition data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex flex-col bg-white rounded-t-2xl shadow-2xl overflow-hidden h-full">
                {/* Top Bar with Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto" />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                {/* Scrollable Cart Section */}
                <div className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
                  {(cart.lineItems?.length === 0 || !cart.lineItems) ? (
                    <div className="flex flex-col justify-center items-center w-full p-6">
                      <h2 className="title font-manrope font-bold text-3xl mb-3 leading-10 text-center text-black/80">Shopping Cart</h2>
                      <Image
                        src={'/empty-cart.png'}
                        alt="empty-cart"
                        width={250}
                        height={250}
                      />
                      <h2 className="title font-manrope font-light text-xl leading-10 text-center text-black/80">Cart is empty!</h2>
                      <Link
                        onClick={() => setOpen(false)}
                        href='/list?cat=featured'
                        className="p-3 mt-3 rounded-md bg-lama text-white hover:bg-lama/80"
                      >
                        Shop Now
                      </Link>
                    </div>
                  ) : (
                    <>
                      <h2 className="title font-manrope font-bold text-3xl leading-10 mb-6 text-center text-black/80">Shopping Cart</h2>
                      {cart.lineItems.map((item) => (
                        <div key={item._id} className="rounded-lg border border-gray-200 p-3 grid grid-cols-12 mb-3 gap-y-4">
                          <div className="col-span-4">
                            {item.image && (
                              <Image
                                src={wixMedia.getScaledToFillImageUrl(item.image, 100, 100, {})}
                                alt=""
                                width={100}
                                height={100}
                                className="object-cover rounded-md"
                              />
                            )}
                          </div>
                          <div className="col-span-8 pl-3">
                            <div className="flex items-center justify-between gap-2">
                              <h5 className="font-manrope font-bold text-sm text-gray-900/80">{item.productName?.original}</h5>
                              <button
                                style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                                onClick={() => removeItem(wixClient, item._id!)}
                                className="rounded-full group flex items-center justify-center"
                              >
                                <svg width="28" height="28" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle className="fill-red-50 group-hover:fill-red-400 transition-all duration-500" cx="17" cy="17" r="17" />
                                  <path
                                    className="stroke-red-500 group-hover:stroke-white transition-all duration-500"
                                    d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997H12.4673V18.8886C12.4673 20.6695 12.4673 21.5599 13.0206 22.1131C13.5738 22.6664 14.4642 22.6664 16.2451 22.6664H17.7562C19.5371 22.6664 20.4275 22.6664 20.9807 22.1131C21.534 21.5599 21.534 20.6695 21.534 18.8886V13.5997Z"
                                    stroke="#EF4444"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                            </div>
                            {(item?.descriptionLines?.length ?? 0) > 0 && (
                              <p className="text-gray-500 font-light text-xs mt-1 tracking-wider">
                                  {item.descriptionLines?.[0]?.name?.original ?? ""}: {item.descriptionLines?.[0]?.plainText?.original ?? ""}
                              </p>
                            )}
                            <p className="text-gray-500 font-light text-xs mt-1 tracking-wider">Quantity: {item.quantity}</p>
                            <p className="text-lama/80 font-manrope font-bold text-lg mt-1">₹ {item.price?.amount}</p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Sticky Checkout Section */}
                {cart.lineItems?.length != 0 && (
                  <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 shadow-inner">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-gray-900 font-manrope font-semibold text-xl">Subtotal</h5>
                      <h6 className="font-manrope font-bold text-xl text-lama">₹ {price}</h6>
                    </div>
                    <p className="text-xs text-gray-500 text-center mb-2">
                      Shipping and discounts are calculated at checkout.
                    </p>
                    <button
                      disabled={isLoading}
                      onClick={handleCheckout}
                      className="w-full rounded-full py-2 bg-lama text-white font-semibold text-lg hover:bg-lama/80 transition-all duration-300"
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CartModal;