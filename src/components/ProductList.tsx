"use client"

import { products } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
// import Pagination from "./Pagination";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { FaCartShopping } from "react-icons/fa6";
import { PiHandbagSimpleLight } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import 'swiper/css';
import { useCartStore } from "@/hooks/useCartStore";

function extractUniqueAttributes(products: any) {
  const colors = new Set();
  const sizes = new Set();

  products.forEach((product: any) => {
    product.variants.forEach((variant: any) => {
      if (variant.choices.Color) {
        colors.add(variant.choices.Color);
      }
      if (variant.choices.Size) {
        sizes.add(variant.choices.Size);
      }
    });
  });

  return [
    formatOptions(sizes, "size", "Size"),
  ];
}

const formatOptions = (set: any, id: string, name: string) => ({
  id,
  name,
  options: Array.from(set).map((value: any) => ({
    value: value.toLowerCase(),
    label: value,
    checked: false,
  })),
});

const ProductList = async ({
  categoryId,
  name,
  limit,
  searchParams,
}: {
  categoryId: string;
  name: string;
  limit?: number;
  searchParams?: any;
}) => {
  const [products, setProducts] = useState<any>([]);
  const [filters, setFilters] = useState<any>([]);
  const wixClient = useWixClient();
  const isMobile = useMediaQuery({ query: '(max-width: 620px)' })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productQuery = wixClient.products
          .queryProducts()
          .startsWith("name", searchParams?.name || "")
          .eq("collectionIds", categoryId)
          .hasSome(
            "productType",
            searchParams?.type ? [searchParams.type] : ["physical", "digital"]
          )
          .gt("priceData.price", searchParams?.min || 0)
          .lt("priceData.price", searchParams?.max || 999999)
        // .limit(limit || PRODUCT_PER_PAGE)
        // .skip(
        //   searchParams?.page
        //     ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        //     : 0
        // );

        if (searchParams?.sort) {
          const [sortType, sortBy] = searchParams.sort.split(" ");
          if (sortType === "asc") productQuery.ascending(sortBy);
          if (sortType === "desc") productQuery.descending(sortBy);
        }
        const skipIds = ['laptop-banners', 'mobile-banners']
        const res = await productQuery.find();
        setFilters(extractUniqueAttributes(res.items));
        setProducts(res.items.filter(item => !skipIds.includes(item.slug || '')));
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]); // fallback to empty array
      }
    };

    fetchProducts();
  }, [categoryId, limit, searchParams]);

  return (
    <>
      {searchParams?.cat ? (
        <ProductsWithFilters name={name} searchParam={searchParams} isMobile={isMobile} filters={filters} products={products} />
      ) : (
        <div className="mt-8 sm:mt-12 flex gap-x-2 md:gap-x-8 gap-y-2 justify-center sm:items-center flex-wrap">
          <AllProducts products={products} searchParams={searchParams} isMobile={isMobile} />
        </div>
      )}
    </>
  );
};

export default ProductList;

const AllProducts = ({ products, searchParams, isMobile }: { products: any, searchParams?: any, isMobile: any }) => {
  const wixClient = useWixClient();
  const { addItem, cart } = useCartStore();

  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [showSizePopup, setShowSizePopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<products.Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [actionType, setActionType] = useState<'buyNow' | 'addToCart'>('buyNow'); // Track the action type

  const handleBuyNow = async (product: products.Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if product has variants
    if (product.variants && product.variants.length > 0) {
      // Check if there are available variants
      const availableVariants = product.variants.filter(variant =>
        variant.stock?.inStock && (variant.stock?.quantity ?? 0) > 0
      );

      if (availableVariants.length === 0) {
        alert('This product is out of stock');
        return;
      }

      // Show size selection popup for buy now
      setSelectedProduct(product);
      setSelectedVariant(null);
      setActionType('buyNow');
      setShowSizePopup(true);
      return;
    }

    // If no variants, proceed with original logic
    try {
      setLoading(product._id!);
      await addItem(wixClient, product._id!, '', 1);

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
    } catch (error) {
      console.error('Error during buy now:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleAddToCart = async (product: products.Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if product has variants
    if (product.variants && product.variants.length > 0) {
      // Check if there are available variants
      const availableVariants = product.variants.filter(variant =>
        variant.stock?.inStock && (variant.stock?.quantity ?? 0) > 0
      );

      if (availableVariants.length === 0) {
        alert('This product is out of stock');
        return;
      }

      // Show size selection popup for add to cart
      setSelectedProduct(product);
      setSelectedVariant(null);
      setActionType('addToCart');
      setShowSizePopup(true);
      return;
    }

    // If no variants, add directly to cart
    try {
      setLoading(product._id!);
      await addItem(wixClient, product._id!, '', 1);
      // Optional: Show success message
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(null);
    }
  };

  const handleSizeSelection = async () => {
    if (!selectedProduct || !selectedVariant) return;

    try {
      setLoading(selectedProduct._id!);
      setShowSizePopup(false);

      await addItem(wixClient, selectedProduct._id!, selectedVariant, 1);

      if (actionType === 'buyNow') {
        // Proceed to checkout for buy now
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
      } else {
        // Just add to cart
        alert('Item added to cart!');
      }
    } catch (error) {
      console.error('Error during size selection:', error);
    } finally {
      setLoading(null);
      setSelectedProduct(null);
      setSelectedVariant(null);
    }
  };

  const closeSizePopup = () => {
    setShowSizePopup(false);
    setSelectedProduct(null);
    setSelectedVariant(null);
  };

  return (
    <>
      {/* Size Selection Popup */}
      {showSizePopup && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Select Size</h3>
              <button
                onClick={closeSizePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">{selectedProduct.name}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-semibold">
                  ₹ {selectedProduct.price?.discountedPrice || selectedProduct.price?.price}
                </span>
                {selectedProduct.price?.price !== selectedProduct.price?.discountedPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹ {selectedProduct.price?.price}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Available Sizes:</p>
              <div className="grid grid-cols-3 gap-2">
                {selectedProduct.variants
                  ?.filter(variant => variant.stock?.inStock && (variant.stock?.quantity ?? 0) > 0)
                  .map((variant, index) => {
                    const size = variant.choices?.['Size'];
                    return size ? (
                      <button
                        key={index}
                        onClick={() => setSelectedVariant(variant._id!)}
                        className={`p-2 border rounded text-sm ${
                          selectedVariant === variant._id
                            ? 'border-lama border-2'
                            : 'border-gray-300 hover:border-lama'
                        }`}
                      >
                        {size}
                      </button>
                    ) : null;
                  })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeSizePopup}
                className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSizeSelection}
                disabled={!selectedVariant || loading === selectedProduct._id}
                className="flex-1 px-4 py-2 bg-lama hover:bg-yellow-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading === selectedProduct._id ? 'Loading...' : (actionType === 'buyNow' ? 'Buy Now' : 'Add to Cart')}
              </button>
            </div>
          </div>
        </div>
      )}

      {(searchParams?.cat || isMobile) ? (
        <>
          {products.map((product: products.Product) => (
            <Link
              href={"/" + product.slug}
              className="flex flex-col justify-between relative sm:shadow-md sm:bg-white/90 w-full sm:w-60 h-[430px] sm:h-[430px] m-1"
              key={product._id}
            >
              {product.price?.price !== product.price?.discountedPrice && (
                <span className="absolute z-[999] top-0 h-fit py-0.5 px-2 font-bold bg-lama/90 text-white/90 text-sm">
                  -{product.discount?.value}%
                </span>
              )}
              <div className="relative w-full h-80 lg:h-80">
                <Image
                  src={product.media?.mainMedia?.image?.url || "/product.png"}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover z-10 hover:opacity-0 transition-opacity ease-in duration-300 object-top"
                />
                {product.media?.items && (
                  <Image
                    src={
                      (product.media?.items.length > 1
                        ? product.media?.items[1]?.image?.url
                        : product.media?.items[0]?.image?.url) || "/product.png"
                    }
                    alt=""
                    fill
                    sizes="25vw"
                    className="absolute object-cover object-top"
                  />
                )}
                {/* Out of Stock Label */}
                {(!product.stock?.inStock || (product.stock?.quantity ?? 0) < 1) && (
                  <div className="absolute top-2 left-2 z-20 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg opacity-90">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="flex flex-col py-2 px-4 sm:py-3 gap-0.5 sm:gap-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-xs sm:text-sm text-[#3b3b3b]/90">{product.name}</p>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={!product.stock?.inStock || (product.stock?.quantity ?? 0) < 1 || loading === product._id}
                    className="sm:text-xl font-semibold hover:text-lama disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PiHandbagSimpleLight className="hover:fill-lama" />
                  </button>
                </div>

                {product.price?.price === product.price?.discountedPrice ? (
                  <h2>₹ {product.price?.price}</h2>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="sm:text-base text-sm">
                      ₹ {product.price?.discountedPrice}
                    </h2>
                    <h3 className="text-xs text-gray-500 line-through">
                      ₹ {product.price?.price}
                    </h3>
                  </div>
                )}
              </div>

              {product.additionalInfoSections && (
                <div
                  className="text-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      product.additionalInfoSections.find(
                        (section: any) => section.title === "shortDesc"
                      )?.description || ""
                    ),
                  }}
                ></div>
              )}
              {product.variants && (
                <div className="relative flex items-center px-4 mt-1 mb-0 text-xs sm:text-sm" style={{ minHeight: 32 }}>
                  {/* Sizes */}
                  <div className="flex gap-2">
                    {product.variants.map((variant, index) => {
                      const size = variant.choices?.['Size'];
                      const outOfStock = !variant.stock?.inStock || (variant.stock?.quantity ?? 0) < 1;
                      return size ? (
                        <p
                          key={index}
                          className={`font-extralight ${outOfStock ? "line-through text-gray-400" : ""}`}
                          title={outOfStock ? "Out of stock" : ""}
                        >
                          {size}
                        </p>
                      ) : null;
                    })}
                  </div>
                  {/* BUY NOW button at absolute right */}
                  <button
                    type="button"
                    disabled={!product.stock?.inStock || (product.stock?.quantity ?? 0) < 1 || loading === product._id}
                    className="absolute right-2 top-3 rounded-md -translate-y-1/2 flex items-center justify-center px-4 py-2 pr-3 bg-lama hover:bg-yellow-500 text-white text-[10px] sm:text-xs tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontWeight: 400, minWidth: "70px", maxHeight: "40px" }}
                    onClick={(e) => handleBuyNow(product, e)}
                  >
                    {loading === product._id ? 'Loading...' : 'Buy Now!'}
                  </button>
                </div>
              )}
            </Link>
          ))}
        </>
      ) : (
        <Swiper
          modules={[Scrollbar]}
          scrollbar={{ draggable: true }}
          slidesPerView={4}
        >
          {products.map((product: products.Product) => (
            <SwiperSlide className="w-full sm:w-60 h-[430px] sm:h-[430px] m-1" key={product.slug}>
              <Link
                href={"/" + product.slug}
                className="flex flex-col justify-between relative sm:shadow-md sm:bg-white/90 w-full h-full"
                key={product._id}
              >
                {product.price?.price !== product.price?.discountedPrice && (
                  <span className="absolute z-[999] top-0 h-fit py-0.5 px-2 font-bold bg-lama/90 text-white/90 text-sm">
                    -{product.discount?.value}%
                  </span>
                )}
                <div className="relative w-full h-80 lg:h-96">
                  <Image
                    src={product.media?.mainMedia?.image?.url || "/product.png"}
                    alt=""
                    fill
                    sizes="25vw"
                    className="absolute object-cover z-10 hover:opacity-0 transition-opacity ease-in duration-300 object-top"
                  />
                  {product.media?.items && (
                    <Image
                      src={
                        (product.media?.items.length > 1
                          ? product.media?.items[1]?.image?.url
                          : product.media?.items[0]?.image?.url) || "/product.png"
                      }
                      alt=""
                      fill
                      sizes="25vw"
                      className="absolute object-cover object-top"
                    />
                  )}
                  {(!product.stock?.inStock || (product.stock?.quantity ?? 0) < 1) && (
                  <div className="absolute top-2 left-2 z-20 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg opacity-90">
                    Out of Stock
                  </div>
                )}
                </div>
                <div className="flex flex-col py-2 px-4 sm:py-3 gap-0.5 sm:gap-1">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-xs sm:text-sm text-[#3b3b3b]/90">{product.name}</p>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      disabled={!product.stock?.inStock || (product.stock?.quantity ?? 0) < 1 || loading === product._id}
                      className="sm:text-xl font-semibold hover:text-lama disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PiHandbagSimpleLight className="hover:fill-lama" />
                    </button>
                  </div>

                  {product.price?.price === product.price?.discountedPrice ? (
                    <h2>₹ {product.price?.price}</h2>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="sm:text-base text-sm">
                        ₹ {product.price?.discountedPrice}
                      </h2>
                      <h3 className="text-xs text-gray-500 line-through">
                        ₹ {product.price?.price}
                      </h3>
                    </div>
                  )}
                </div>

                {product.additionalInfoSections && (
                  <div
                    className="text-sm text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        product.additionalInfoSections.find(
                          (section: any) => section.title === "shortDesc"
                        )?.description || ""
                      ),
                    }}
                  ></div>
                )}
                {product.variants && (
                  <div className="relative flex items-center px-4 mt-1 mb-0 text-xs sm:text-sm" style={{ minHeight: 32 }}>
                    {/* Sizes */}
                    <div className="flex gap-2">
                      {product.variants.map((variant, index) => {
                        const size = variant.choices?.['Size'];
                        const outOfStock = !variant.stock?.inStock || (variant.stock?.quantity ?? 0) < 1;
                        return size ? (
                          <p
                            key={index}
                            className={`font-extralight ${outOfStock ? "line-through text-gray-400" : ""}`}
                            title={outOfStock ? "Out of stock" : ""}
                          >
                            {size}
                          </p>
                        ) : null;
                      })}
                    </div>
                    {/* BUY NOW button at absolute right */}
                    <button
                      type="button"
                      disabled={!product.stock?.inStock || (product.stock?.quantity ?? 0) < 1 || loading === product._id}
                      className="absolute right-2 top-3 -translate-y-1/2 flex items-center justify-center px-4 py-2 rounded-md bg-lama hover:bg-yellow-500 text-white text-[10px] sm:text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontWeight: 400, minWidth: "70px", maxHeight: "40px", }}
                      onClick={(e) => handleBuyNow(product, e)}
                    >
                      {loading === product._id ? 'Loading...' : 'BUY NOW!'}
                    </button>
                  </div>
                )}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

const ProductsWithFilters = ({ products, filters, name, searchParam, isMobile }: { products: any, filters: any, name: any, searchParam: any, isMobile: any }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState<any>({
    Color: [],
    Size: [],
  });

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleDropdownChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const sortOptions = [
    { name: 'Newest', value: "desc lastUpdated", current: false },
    { name: 'Price: Low to High', value: "asc price", current: false },
    { name: 'Price: High to Low', value: "desc price", current: false },
  ];

  const handleFilterChange = (type: any, value: any) => {
    setSelectedFilters((prevFilters: any) => {
      const appliedFilters = { ...prevFilters };
      if (appliedFilters[type].includes(value)) {
        appliedFilters[type] = appliedFilters[type].filter((item: any) => item !== value);
      } else {
        appliedFilters[type].push(value);
      }
      return appliedFilters;
    });
  };

  const filterProducts = (products: any, selectedFilters: any) => {
    return products.filter((product: any) =>
      product.variants.some((variant: any) => {
        const { Color, Size } = variant.choices;
        const matchesColor =
          !selectedFilters.Color.length || selectedFilters.Color.includes(Color);
        const matchesSize =
          !selectedFilters.Size.length || selectedFilters.Size.includes(Size);
        return matchesColor && matchesSize;
      })
    );
  };

  const filteredProducts = filterProducts(products, selectedFilters);

  return (
    <div className="bg-[#efefef]">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-[9999] lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  type="button"
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {filters.map((section: any) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options?.map((option: any, optionIdx: any) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  onChange={() => handleFilterChange(section.name, option.label)}
                                  checked={section.name === 'Color' ? selectedFilters.Color.includes(option.label) : selectedFilters.Size.includes(option.label)}
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-200 bg-white checked:border-lama checked:bg-lama indeterminate:border-lama indeterminate:bg-lama focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lama disabled:border-gray-300/70 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-300/70 pb-6 pt-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{name}</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left z-[9999]">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <p className={`
                            ${option.current ? 'font-medium text-gray-900' : 'text-gray-500'} block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                          `}
                          onClick={() => handleDropdownChange('sort', option.value)}
                        >
                          {option.name}
                        </p>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h2 className="text-gray-900/70 text-sm">Filter by</h2>
                {filters.map((section: any) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-300/70 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options?.map((option: any, optionIdx: any) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  onChange={() => handleFilterChange(section.name, option.label)}
                                  checked={section.name === 'Color' ? selectedFilters.Color.includes(option.label) : selectedFilters.Size.includes(option.label)}
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300/70 bg-white checked:border-lama checked:bg-lama indeterminate:border-lama indeterminate:bg-lama focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lama disabled:border-gray-300/70 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 flex gap-x-2 md:gap-x-8 gap-y-16 justify-center items-center flex-wrap">
                <AllProducts products={filteredProducts} searchParams={searchParam} isMobile={isMobile} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}