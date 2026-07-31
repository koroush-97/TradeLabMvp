import axios from "axios";
import toast from "react-hot-toast";

const coingeckoApi = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
});

coingeckoApi.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      toast.error("ارتباط با سرویس دریافت قیمت برقرار نشد");
      return Promise.reject(error);
    }

    if (error.response.status === 429) {
      toast.error(
        "تعداد درخواست‌ها بیش از حد مجاز است؛ کمی بعد دوباره تلاش کنید",
      );
    } else {
      toast.error("دریافت اطلاعات بازار با خطا مواجه شد");
    }

    return Promise.reject(error);
  },
);

export default coingeckoApi;
