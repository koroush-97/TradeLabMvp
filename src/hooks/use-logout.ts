import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/auth";
import toast from "react-hot-toast";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    removeToken();

    toast.success("با موفقیت از حساب کاربری خارج شدید");

    router.push("/");
  };

  return logout;
};
