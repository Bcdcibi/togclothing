import UpdateButton from "@/components/UpdateButton";
import { updateUser } from "@/lib/actions";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import Link from "next/link";
import { format } from "timeago.js";

const ProfilePage = async () => {
  try {
    const wixClient = await wixClientServer();

    // Attempt to fetch the current member
    const user = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });

    // If no contactId, user is not logged in
    if (!user.member?.contactId) {
      return <div className="">Not logged in!</div>;
    }

    // Fetch user's orders
    const orderRes = await wixClient.orders.searchOrders({
      search: {
        filter: { "buyerInfo.contactId": { $eq: user.member.contactId } },
      },
    });

    return (
      <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl">Profile</h1>
          <form action={updateUser} className="mt-12 flex flex-col gap-4">
            <label className="text-sm text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              defaultValue={user.member?.profile?.nickname || ""}
              className="ring-1 ring-gray-300 rounded-md p-2"
            />
            <label className="text-sm text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={user.member?.loginEmail || ""}
              className="ring-1 ring-gray-300 rounded-md p-2"
            />
            <UpdateButton />
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl">Orders</h1>
          <div className="mt-12 flex flex-col">
            {orderRes.orders.map((order) => (
              <Link
                href={`/orders/${order._id}`}
                key={order._id}
                className="flex justify-between px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100"
              >
                <span className="w-1/4">{order._id?.substring(0, 10)}...</span>
                <span className="w-1/4">${order.priceSummary?.subtotal?.amount}</span>
                {order._createdDate && (
                  <span className="w-1/4">{format(order._createdDate)}</span>
                )}
                <span className="w-1/4">{order.status}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error:any) {
    console.error("Error fetching user or orders:", error);

    // Graceful fallback for errors
    return <div className="text-red-600">An error occurred: {error.message}</div>;
  }
};

export default ProfilePage;