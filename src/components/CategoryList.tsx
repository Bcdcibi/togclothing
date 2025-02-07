import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
  const wixClient = await wixClientServer();

  const cats = await wixClient.collections.queryCollections().find();

  return (
    <div id="category" className="px-8 overflow-x-scroll scrollbar-hide">
      <div className="flex sm:flex-wrap sm:justify-center sm:items-center gap-8">
        {cats.items.map((item) => {
          if (item.slug === 'featured' || item.slug === 'all-products' || item.slug === 'new-arrivals') return;

          return (
            <div key={item._id}
              className="shrink-0 w-[85%] mx-5 sm:w-[10%] mt-10">
              <Link
                href={`/list?cat=${item.slug}`}
                className="box">
                <div className="relative bg-slate-100 w-full h-64 hover:scale-105 transition-all duration-300">
                  <Image
                    src={item.media?.mainMedia?.image?.url || "category.png"}
                    alt=""
                    fill
                    sizes="20vw"
                    className="object-cover transition-all duration-200"
                  />
                </div>
              </Link>
              <h1 className="mt-6 text-center font-light text-sm tracking-wide">
                {item.name}
              </h1>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default CategoryList;
