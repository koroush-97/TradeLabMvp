# آزمایشگاه رمزارز — پلتفرم تعاملی معاملات آزمایشی (TradeLab)



![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

یک **رابط کاربری مدرن و واکنش‌گرا (Responsive) به زبان فارسی** برای معاملات آزمایشی (Paper Trading) رمزارزها که با هدف آموزش، شبیه‌سازی بازار واقعی و تمرین استراتژی‌های معاملاتی بدون ریسک مالی توسعه یافته است.

این فرانت‌اند با اتصال به هسته بک‌اند TradeLab و استفاده از داده‌های لحظه‌ای، امکان معامله، مشاهده نمودارهای تکنیکال حرفه‌ای (TradingView Lightweight Charts)، مدیریت پرتفوی و مشاهده وضعیت سود/زیان را در یک محیط روان و جذاب برای کاربران فراهم می‌کند.

> [!IMPORTANT]
> این رابط کاربری متعلق به یک پلتفرم آموزشی **شبیه‌ساز معاملات (Demo / Paper Trading)** است. تمامی معاملات با دارایی‌های مجازی انجام می‌شوند و هیچ‌گونه تراکنش مالی واقعی وجود ندارد.

---

## ✨ ویژگی‌ها و قابلیت‌های رابط کاربری

- 📊 **نمودار کندل‌استیک حرفه‌ای**: ترسیم نمودارهای لحظه‌ای OHLC با استفاده از موتور سبک و سریع `lightweight-charts`.
- 💼 **داشبورد جامع دارایی‌ها**: مشاهده مجموع موجودی، دارایی‌های رمزارزی (Holdings) و تفکیک بصری پرتفوی با نمودارهای Donut Chart مبتنی بر `Recharts`.
- ⚡ **پنل معامله لحظه‌ای (Trade Station)**: فرم خرید و فروش سریع با اعتبارسنجی دقیق ورودی‌ها، محاسبه لحظه‌ای ارزش معامله و مدیریت خطا.
- 📜 **تاریخچه تراکنش‌ها**: جدول تفصیلی معاملات انجام‌شده به همراه وضعیت، سود/زیان و زمان دقیق.
- 🎓 **بخش آموزش (Learn)**: محیط یادگیری و ویدیوپلیر یکپارچه برای مفاهیم تحلیل تکنیکال و فاندامنتال.
- 🔒 **محافظت از مسیرها (Route Guards)**: سیستم Proxy / Middleware برای کنترل سشن و ریدایرکت خودکار کاربران در مسیرهای `(protected)` و `(auth)`.
- 👤 **پروفایل و تنظیمات**: امکان به‌روزرسانی اطلاعات، تغییر رمز عبور و دکمه ریست کامل حساب آزمایشی.
- 🎨 **تایپوگرافی و ظاهر فارسی استاندارد**: پیاده‌سازی فونت وزیرمتن (Vazirmatn)، رنگ‌بندی استاندارد مالی، نوتیفیکیشن‌های تعاملی با `react-hot-toast` و آیکون‌های مدرن `Lucide React`.

---

## 🧰 تکنولوژی‌های استفاده‌شده

| تکنولوژی | کاربرد |
|---|---|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white) | فریم‌ورک فول‌استک بر پایه React با ساختار App Router |
| ![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black) | کتابخانه رابط کاربری |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | تایپ‌سیفتی و خوانایی کد |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?logo=tailwind-css&logoColor=white) | استایل‌دهی سریع و طراحی واکنش‌گرا |
| ![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?logo=react-query&logoColor=white) | مدیریت کش، همگام‌سازی سرور و دریافت بهینه داده‌ها |
| ![Lightweight Charts](https://img.shields.io/badge/Lightweight_Charts-199900?logo=tradingview&logoColor=white) | رندرینگ پرسرعت نمودارهای تعاملی قیمت |
| ![Recharts](https://img.shields.io/badge/Recharts-22B5BF?logoColor=white) | رسم نمودارهای آماری توزیع پورتفولیو |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white) | مدیریت فرم‌های ورود، ثبت‌نام و سفارش‌گذاری |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white) | ارتباط کلاینت با API بک‌اند |
| ![Lucide Icons](https://img.shields.io/badge/Lucide_React-F56565?logo=lucide&logoColor=white) | آیکون‌های مینیمال رابط کاربری |

---

## 🏗️ ساختار پروژه

ساختار پروژه بر اساس استاندارد Next.js App Router و تفکیک لایه‌های Services، Hooks و Components پیاده‌سازی شده است:
```text
src/
├── app/
│   ├── (auth)/                     # مسیرهای ورود و ثبت‌نام
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/                # مسیرهای نیازمند احراز هویت
│   │   └── dashboard/
│   │       ├── _components/        # کامپوننت‌های اختصاصی داشبورد (چارت‌ها، سایدبار، فرم‌ها)
│   │       ├── assets/             # صفحه دارایی‌ها
│   │       ├── history/            # صفحه تاریخچه معاملات
│   │       ├── settings/           # صفحه تنظیمات و ریست حساب
│   │       ├── trade/              # ایستگاه ترید
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── _components_ui/             # کامپوننت‌های عمومی و اتمیک (Button, Modal, Card, Navbar)
│   ├── learn/                      # صفحه آموزش و ویدیوها
│   ├── globals.css                 # تنظیمات Tailwind 4 و استایل‌های عمومی
│   ├── layout.tsx                  # لی‌اوت اصلی و لود فونت‌ها
│   └── page.tsx                    # لندینگ پیج اصلی پلتفرم
├── components/
│   └── providers/                  # پرووایدرهای سراسری (مانند React Query)
├── hooks/                          # کاستوم‌هوک‌ها (Holdings, Wallet, Market, Trade, Auth, ...)
├── lib/                            # پیکربندی کلاینت‌های عمومی (Axios Instance, QueryClient, CoinGecko)
├── proxy.ts                        # منطق بررسی توکن و گارد مسیرها
├── services/                       # سرویس‌های ارتباط مستقیم با اندپوینت‌های API
├── types/                          # تعاریف و تایپ‌های داده‌های دریافتی و ارسالی
└── utils/                          # توابع کمکی (مدیریت خطا، فرمت‌کننده‌ها و احراز هویت)

---

