"use client";

import { useFormStatus } from "react-dom";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-lama text-white p-2 rounded-md cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed mt-2"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
