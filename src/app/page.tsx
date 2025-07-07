// "use client";

import CategoryList from "@/components/CategoryList";
import HomeCards from "@/components/HomeCards";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";
import { Suspense } from "react";

const HomePage = async () => {

  // TEST (FETCHING ON THE CLIENT COMPONENT)

  // const wixClient = useWixClient()

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await wixClient.products.queryProducts().find();

  //     console.log(res)
  //   };

  //   getProducts();
  // }, [wixClient]);


  // TEST (FETCHING ON THE SERVER COMPONENT)

  // const wixClient = await wixClientServer();

  // const res = await wixClient.products.queryProducts().find();

  // console.log(res);

  return (
    <div className="">
      <Slider />
      <div className="mt-24">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-semibold px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-16 md:px-12 xl:px-16 2xl:px-32">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-black/80">New Arrivals</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            name="New Arrivals"
            categoryId={process.env.FEATURED_PRODUCTS_NEW_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-16 md:px-8 xl:px-16 2xl:px-32">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-black/80">Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList
            name="Featured Products"
            categoryId={'00000000-000000-000000-000000000001'}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
