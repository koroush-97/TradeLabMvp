"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { isAuthenticated } from "@/utils/auth";

export const useProtectedNavigate = () => {
  const router = useRouter();

  const navigate = (targetPath: string) => {
    if (isAuthenticated()) {
      router.push(targetPath);
      return;
    }

    toast.error("برای شروع، ابتدا وارد حساب کاربری شوید");
    router.push(`/login?redirect=${encodeURIComponent(targetPath)}`);
  };

  return navigate;
};
