"use client"

import { products } from "@wix/stores";
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
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { useEffect, useState } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { FaCartShopping } from "react-icons/fa6";
import { PiHandbagSimpleLight } from "react-icons/pi";
import { useMediaQuery } from "react-responsive";
import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import 'swiper/css';

const PRODUCT_PER_PAGE = 8;

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

      const res = await productQuery.find();
      setFilters(extractUniqueAttributes(res.items));
      setProducts(res.items);
      console.log(res.items)
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

const AllProducts = ({ products, searchParams, isMobile }: { products: any, searchParams?: any, isMobile: any }) => (
  <>
    {(searchParams?.cat || isMobile) ? (
      <>
        {products.map((product: products.Product) => (
          <Link
            href={"/" + product.slug}
            className="flex flex-col relative sm:shadow-md sm:bg-white/90 w-[48%] lg:w-[22%]"
            key={product._id}
          >
            {product.price?.price !== product.price?.discountedPrice && (
              <span className="absolute z-[999] top-0 h-fit py-0.5 px-2 font-bold bg-lama/90 text-white/90 text-sm">
                -{product.discount?.value}%
              </span>
            )}
            <div className="relative w-full h-64 lg:h-64">
              <Image
                src={product.media?.mainMedia?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover z-10 hover:opacity-0 transition-opacity ease-in duration-300 object-top"
              />
              {product.media?.items && (
                <Image
                  src={(product.media?.items.length > 1 ? product.media?.items[1]?.image?.url : product.media?.items[0]?.image?.url) || "/product.png"}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover object-top"
                />
              )}
            </div>
            <div className="flex flex-col py-2 px-4 sm:py-3 gap-0.5 sm:gap-1">
              <div className="flex justify-between items-center">
                <p className="font-medium text-xs sm:text-sm text-[#3b3b3b]/90">{product.name}</p>
                <p className="sm:text-xl font-semibold"><PiHandbagSimpleLight className="hover:fill-lama" /></p>
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
              <div className="flex pb-2 text-xs sm:text-sm justify-start gap-2 items-center px-4">
                {product.variants.map((variant, index) => (
                  <>
                    {variant.choices && <p className="font-extralight" key={index}>{variant.choices['Size']}</p>}
                  </>
                ))}
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
          <SwiperSlide className="w-[48%] lg:w-[22%] px-2 pb-4" key={product.slug}>
            <Link
              href={"/" + product.slug}
              className="flex flex-col relative sm:shadow-md sm:bg-white/90"
              key={product._id}
            >
              {product.price?.price !== product.price?.discountedPrice && (
                <span className="absolute z-[999] top-0 h-fit py-0.5 px-2 font-bold bg-lama/90 text-white/90 text-sm">
                  -{product.discount?.value}%
                </span>
              )}
              <div className="relative w-full h-64 lg:h-96">
                <Image
                  src={product.media?.mainMedia?.image?.url || "/product.png"}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover z-10 hover:opacity-0 transition-opacity ease-in duration-300 object-top"
                />
                {product.media?.items && (
                  <Image
                    src={(product.media?.items.length > 1 ? product.media?.items[1]?.image?.url : product.media?.items[0]?.image?.url) || "/product.png"}
                    alt=""
                    fill
                    sizes="25vw"
                    className="absolute object-cover object-top"
                  />
                )}
              </div>
              <div className="flex flex-col py-2 px-4 sm:py-3 gap-0.5 sm:gap-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-xs sm:text-sm text-[#3b3b3b]/90">{product.name}</p>
                  <p className="sm:text-xl font-semibold"><PiHandbagSimpleLight className="hover:fill-lama" /></p>
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
                <div className="flex pb-2 text-xs sm:text-sm justify-start gap-2 items-center px-4">
                  {product.variants.map((variant, index) => (
                    <>
                      {variant.choices && <p className="font-extralight" key={index}>{variant.choices['Size']}</p>}
                    </>
                  ))}
                </div>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    )}
  </>
);

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
              <div className="lg:col-span-3 flex gap-x-4 md:gap-x-8 gap-y-16 justify-center items-center flex-wrap">
                <AllProducts products={filteredProducts} searchParams={searchParam} isMobile={isMobile} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}