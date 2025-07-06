import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";
import { wixClientServer } from "@/lib/wixClientServer";
import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Accordion from "@/components/Accordion";
import Skeleton from "@/components/Skeleton";
import ProductList from "@/components/ProductList";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];

  return (
    <div>
      <div className="px-4 mt-12 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-8 sm:gap-16">
        {/* IMG */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages items={product.media?.items} />
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-2 sm:gap-4">
          <h1 className="text-2xl sm:text-4xl font-medium">{product.name}</h1>
          <p className='text-sm sm:text-base' dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description || ""),
          }}></p>
          {product.price?.price === product.price?.discountedPrice ? (
            <h3 className="text-very-dark font-bold text-3xl inline-block">
              ₹ {product.price?.price}
            </h3>
          ) : (
            <div className="flex justify-between flex-col items-start">
              <div className="flex items-center gap-4">
                <h3
                  className="text-very-dark font-bold text-3xl inline-block"
                >
                  ₹ {product.price?.discountedPrice}
                </h3>
                <span
                  className="inline-block h-fit py-0.5 px-2 font-bold bg-lama/20 text-lama rounded-lg text-sm"
                >{product.discount?.value}%</span>
              </div>
              <p
                className="text-dark-grayish w-fit line-through decoration-dark-grayish decoration-1 my-auto"
              >
                ₹ {product.price?.price}
              </p>
            </div>
          )}
          <div className="h-[1px] bg-gray-100" />
          {product.variants && product.productOptions ? (
            <CustomizeProducts
              productId={product._id!}
              variants={product.variants}
              productOptions={product.productOptions}
            />
          ) : (
            <Add
              productId={product._id!}
              variantId="00000000-0000-0000-0000-000000000000"
              stockNumber={product.stock?.quantity || 0}
            />
          )}
          <div className="h-[2px] bg-gray-100" />
          {product.additionalInfoSections?.map((section: any) => (
            <Accordion title={section.title} content={section.description} key={section.title} />
          ))}
          <div className="h-[2px] bg-gray-100" />
          {/* REVIEWS */}
          {/* <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading...">
          <Reviews productId={product._id!} />
        </Suspense> */}
        </div>
      </div>
      <div className="mt-16 sm:mt-28 px-4 md:px-12 xl:px-16 2xl:px-32">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black/80 ml-8">You may also like these!</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            name="Featured Products"
            categoryId='1b7aaea5-7082-c9f6-2b18-5248ba478bf7'
          />
        </Suspense>
      </div>
    </div>
  );
};

export default SinglePage;
