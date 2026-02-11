"use client";
import { toast } from "react-hot-toast";
import axios from "axios";
import Icon from "./Icon";
import { useRouter } from "next/navigation";

const ButtonDeleteSub = ({ subId }) => {
  const router = useRouter();

  const handleDeleteSub = async () => {
    try {
      const isUserSure = window.confirm(
        "Are you sure you want to delete this?",
      );

      if (isUserSure) {
        await axios.delete(`/api/sub?subId=${subId}`);

        toast.success("Subscription deleted!");

        router.refresh();
        router.push("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteSub}
        className="btn btn-ghost btn-circle text-error border-none shadow-none hover:bg-error/20"
        aria-label="Delete Sub"
      >
        <Icon name="trash-alt" className="" />
      </button>
    </>
  );
};

export default ButtonDeleteSub;
