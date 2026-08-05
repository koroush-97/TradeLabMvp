import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "TradeLab|تمرین ترید بدون ریسک",
  description:
    "TradeLab یک پلتفرم آموزشی برای تمرین خرید و فروش رمزارز بدون ریسک مالی است.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-background text-foreground font-sans antialiased">
        <QueryProvider>{children}</QueryProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#111827",
              color: "#f8fafc",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontFamily: "var(--font-vazirmatn)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
