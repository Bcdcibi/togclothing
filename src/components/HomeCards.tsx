import Image from "next/image";

function HomeCards() {
    return (
        <div className="w-full flex sm:flex-row flex-col justify-center items-center gap-16 mt-24 sm:p-0 p-4">
            <div className="flex flex-col justify-center items-center gap-4">
                <Image
                    src='/shipping.png'
                    width={300}
                    height={300}
                    alt="Shipping Image"
                    className="object-cover w-[25rem] h-[25rem] hover:scale-105 transition-all duration-500 cursor-pointer ease-in-out"
                />
                <h1 className="text-sm text-center font-light">Free Shipping for orders above ₹ 999/-</h1>
            </div>
            <div className="flex flex-col justify-center items-center gap-4">
                <Image
                    src='/return.jpg'
                    width={300}
                    height={300}
                    alt="Shipping Image"
                    className="object-cover w-[25rem] h-[25rem] hover:scale-105 transition-all duration-500 cursor-pointer ease-in-out"
                />
                <h1 className="text-sm text-center font-light">Free Exchange return</h1>
            </div>
        </div>
    );
}

export default HomeCards