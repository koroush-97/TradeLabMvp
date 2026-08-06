// @components
import Image from "next/image";
import Navbar from "./_components_ui/Navbar";
import { FeatureCard } from "./_components_ui/FeatureCard";
import { Button } from "./_components_ui/Button";

const features = [
  {
    title: "قیمت‌های بازار",
    description: "مشاهده داده‌های بازار و تمرین تحلیل رفتار قیمت در محیطی امن.",
  },
  {
    title: "معامله آزمایشی",
    description: "خرید و فروش ارزهای دیجیتال بدون ریسک و با پول مجازی.",
  },
  {
    title: "مدیریت دارایی‌ها",
    description: "پیگیری سبد دارایی و تحلیل سود و زیان معاملات گذشته.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 md:flex-row md:items-center md:px-6 md:py-24">
        <div className="flex-1">
          <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
            یادگیری ترید، بدون ریسک مالی
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
            شبیه‌ساز آموزشی
            <span className="block text-primary">معاملات رمزارز</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            TradeLab یک محیط آموزشی فارسی و راست‌به‌چپ برای تمرین خرید و فروش
            رمزارز است؛ با داده‌های بازار، موجودی مجازی و تجربه‌ای نزدیک به
            بازار واقعی.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button protectedHref="/dashboard/trade" variant="primary">
              شروع تمرین
            </Button>

            <Button variant="secondary" href="/learn">
              رفتن به آموزش
            </Button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="flex-1">
          <div>
            <Image
              src="/landing/bit-hero.png"
              alt="تصویر بیت‌کوین و رشد بازار"
              width={700}
              height={500}
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 md:px-6"
      >
        <div className="mb-10">
          <p className="text-sm font-semibold text-primary">امکانات اصلی</p>
          <h3 className="mt-2 text-2xl font-black md:text-3xl">
            هر چیزی که برای یادگیری ترید لازم داری
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((item, index) => (
            <FeatureCard
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 md:px-6"
      >
        <div className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-[1.2fr_0.8fr]">
          <div className="p-6 md:p-10">
            <p className="text-sm font-semibold text-primary">
              درباره TradeLab
            </p>

            <h3 className="mt-2 text-2xl font-black md:text-3xl">
              تمرین کن، یاد بگیر و آگاهانه‌تر تصمیم بگیر
            </h3>

            <p className="mt-5 max-w-3xl leading-8 text-muted-foreground">
              TradeLab یک پلتفرم آموزشی فارسی برای افرادی است که می‌خواهند پیش
              از ورود به بازار واقعی رمزارز، مفاهیم معامله‌گری را در یک محیط امن
              و آزمایشی یاد بگیرند.
            </p>

            <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">
              در TradeLab می‌توانی مفاهیم پایه، مدیریت ریسک و تحلیل نمودار را
              مطالعه کنی، سپس با موجودی مجازی و بدون ریسک مالی، آموخته‌هایت را
              در محیط شبیه‌سازی‌شده تمرین کنی.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 border-t border-border bg-surface p-6 md:border-t-0 md:border-r md:p-10">
            <div>
              <p className="text-3xl font-black text-primary">بدون ریسک</p>
              <p className="mt-1 text-sm text-muted-foreground">
                تمرین با موجودی آزمایشی
              </p>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="text-3xl font-black text-primary">فارسی و RTL</p>
              <p className="mt-1 text-sm text-muted-foreground">
                طراحی‌شده برای کاربران فارسی‌زبان
              </p>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p className="text-3xl font-black text-primary">آموزش‌محور</p>
              <p className="mt-1 text-sm text-muted-foreground">
                یادگیری قبل از معامله در بازار واقعی
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Start CTA */}
      <section
        id="cta"
        className="scroll-mt-24 mx-auto max-w-7xl px-4 py-16 md:px-6"
      >
        <div className="rounded-3xl border border-primary/25 bg-primary/10 p-6 text-center md:p-12">
          <p className="text-sm font-semibold text-primary">آماده شروع هستی؟</p>

          <h3 className="mt-3 text-2xl font-black md:text-4xl">
            مسیر یادگیری ترید را بدون ریسک شروع کن
          </h3>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
            ابتدا مفاهیم ضروری را در بخش آموزش یاد بگیر، سپس با کیف پول مجازی و
            داده‌های بازار، معامله‌گری را در محیط تمرینی TradeLab تجربه کن.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="secondary" href="/learn">
              شروع آموزش
            </Button>

            <Button variant="primary" protectedHref="/dashboard/trade">
              ورود به معامله آزمایشی
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-6">
        <div className="mx-auto max-w-7xl px-4 text-sm text-muted-foreground md:px-6">
          © {new Date().getFullYear()} TradeLab — همه حقوق محفوظ است.
        </div>
      </footer>
    </main>
  );
}
