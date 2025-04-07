import { wixClientServer } from "@/lib/wixClientServer";
import Link from "next/link";
import { notFound } from "next/navigation";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const wixClient = await wixClientServer();

  let order;
  try {
    order = await wixClient.orders.getOrder(id);
  } catch (err) {
    return notFound();
  }

  return (
    <div className="flex p-4 flex-col h-[calc(100vh-10px)] items-center justify-center ">
      <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-40 py-20">
      <h1 className="text-xl font-bold">Order Details</h1>
      <div className="mt-12 flex flex-col gap-6">
        <div className="">
          <span className="font-semibold">Order Id: </span>
          <span>{order._id}</span>
        </div>
        <div className="">
          <span className="font-semibold">Receiver Name: </span>
          <span>
            {order.billingInfo?.contactDetails?.firstName + " "}
            {order.billingInfo?.contactDetails?.lastName}
          </span>
        </div>
        <div className="">
          <span className="font-semibold">Receiver Email: </span>
          <span>{order.buyerInfo?.email}</span>
        </div>
        <div className="">
          <span className="font-semibold">Price: </span>
          <span>{order.priceSummary?.subtotal?.amount}</span>
        </div>
        <div className="">
          <span className="font-semibold">Payment Status: </span>
          <span>{order.paymentStatus}</span>
        </div>
        <div className="">
          <span className="font-semibold">Order Status: </span>
          <span>{order.status}</span>
        </div>
        <div className="">
          <span className="font-semibold">Delivery Address: </span>
          <span>
            {order.billingInfo?.address?.addressLine1 + " "}
            {order.billingInfo?.address?.city}
          </span>
        </div>
      </div>
      </div>
      <Link href="/" className="underline mt-6">
        Have a problem? Contact us
      </Link>
    </div>
  );
};

export default OrderPage;
