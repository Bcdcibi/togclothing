"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  // // TEMPORARY
  // const stock = 4;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const wixClient = useWixClient();

  const { addItem, isLoading } = useCartStore();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-40 h-10 text-sm bg-white/80 py-3 px-4 flex items-center justify-between rounded-lg font-bold relative">
            <div id="minus" className="plus-minus cursor-pointer disabled:cursor-not-allowed disabled:opacity-20">
              <button
                className="w-3 h-1 bg-orange absolute"
                id="minus"
                onClick={() => handleQuantity("d")}
                disabled={quantity === 1}
              >
                <svg
                  width="12"
                  height="4"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                      id="a"
                    />
                  </defs>
                  <use
                    fill="#FB980D"
                    fill-rule="nonzero"
                    xlinkHref="#a"
                  />
                </svg>
              </button>
            </div>
            <span id="amount" className="select-none">{quantity}</span>
            <button
              onClick={() => handleQuantity("i")}
              disabled={quantity === stockNumber}
              id="plus" className="plus-minus cursor-pointer disabled:cursor-not-allowed disabled:opacity-20">
              <svg
                width="12"
                height="12"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                id="plus"
              >
                <defs>
                  <path
                    d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                    id="b"
                  />
                </defs>
                <use
                  fill="#FB980D"
                  fill-rule="nonzero"
                  xlinkHref="#b"
                  id="plus"
                />
              </svg>
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is <span className="text-red-500">out of stock</span></div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
        <button onClick={() => addItem(wixClient, productId, variantId, quantity)}
          disabled={isLoading}
          className="w-full text-base rounded-lg ring-1 ring-lama bg-lama text-white py-2 sm:py-3 px-4 hover:bg-lama/80 disabled:cursor-not-allowed disabled:bg-lama/60 disabled:ring-0 disabled:text-white disabled:ring-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
