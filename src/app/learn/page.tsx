import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CirclePlay,
  Clock3,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { InfoChip } from "@/app/_components_ui/InfoChip";
import { VideoCard } from "../_components_ui/VideoCard";
import { SectionCard } from "../_components_ui/SectionCard";

const courseStats = [
  { icon: BookOpen, text: "۴ فصل آموزشی" },
  { icon: CirclePlay, text: "۱۰ ویدیوی آموزشی" },
  { icon: Clock3, text: "مناسب شروع از صفر" },
];

type VideoItem = {
  title: string;
  duration: string;
  aparatEmbedUrl: string;
};

type LearningSection = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  points: string[];
  videos: VideoItem[];
};

const learningSections: LearningSection[] = [
  {
    id: 1,
    title: "ترید چیست؟ چگونه انجام می‌شود؟",
    description:
      "پیش از ورود به دنیای معامله‌گری، لازم است بدانید ترید دقیقاً چیست، چه تفاوتی با سرمایه‌گذاری دارد و معامله‌گران چگونه با تحلیل بازار برای خرید یا فروش تصمیم می‌گیرند.",
    icon: <BookOpen size={22} />,
    accent: "from-cyan-500 to-blue-600",
    points: [
      "آشنایی با مفهوم ترید و بازارهای مالی",
      "تفاوت ترید کوتاه‌مدت با سرمایه‌گذاری بلندمدت",
      "مراحل اصلی انجام یک معامله آزمایشی",
    ],
    videos: [
      {
        title: "ترید چیست و چه تفاوتی با سرمایه‌گذاری دارد؟",
        duration: "۸ دقیقه",
        aparatEmbedUrl:
          "https://www.aparat.com/video/video/embed/videohash/ylz92zd/vt/frame?titleShow=true",
      },
      {
        title: "بازار رمزارز چگونه کار می‌کند؟",
        duration: "۱۰ دقیقه",
        aparatEmbedUrl:
          "https://www.aparat.com/video/video/embed/videohash/boio9gc/vt/frame",
      },
    ],
  },
  {
    id: 2,
    title: "آموزش مدیریت ریسک",
    description:
      "مدیریت ریسک مهم‌ترین مهارتی است که به شما کمک می‌کند پیش از فکر کردن به سود، از سرمایه خود محافظت کنید. هیچ معامله‌ای بدون ریسک نیست؛ اما می‌توان ریسک را کنترل کرد.",
    icon: <ShieldCheck size={22} />,
    accent: "from-emerald-500 to-teal-600",
    points: [
      "چرا نباید تمام سرمایه را وارد یک معامله کرد؟",
      "آشنایی با حد ضرر یا Stop Loss",
      "محاسبه نسبت ریسک به بازده پیش از ورود به معامله",
    ],
    videos: [
      {
        title: "مدیریت ریسک چیست و چرا اهمیت دارد؟",
        duration: "۹ دقیقه",
        aparatEmbedUrl:
          "https://www.aparat.com/video/video/embed/videohash/vblek5t/vt/frame",
      },
      {
        title: "حد ضرر (Stop Loss) را چگونه تعیین کنیم؟",
        duration: "۱۲ دقیقه",
        aparatEmbedUrl:
          "https://www.aparat.com/video/video/embed/videohash/vuyb6c6/vt/frame",
      },
      {
        title: "نسبت ریسک به بازده چیست؟",
        duration: "۷ دقیقه",
        aparatEmbedUrl:
          " https://www.aparat.com/video/video/embed/videohash/j0732f7/vt/frame",
      },
    ],
  },
  {
    id: 3,
    title: "تحلیل تکنیکال مقدماتی",
    description:
      "در این بخش با زبان نمودارها آشنا می‌شوید. هدف این نیست که آینده بازار را قطعی پیش‌بینی کنید؛ بلکه یاد می‌گیرید با داده‌های قیمت، تصمیم‌های منطقی‌تر بگیرید.",
    icon: <TrendingUp size={22} />,
    accent: "from-violet-500 to-fuchsia-600",
    points: [
      "شناخت کندل‌ها و اطلاعاتی که نمایش می‌دهند",
      "آشنایی با حمایت، مقاومت و روند بازار",
      "مقدمات بررسی نمودار قیمت رمزارزها",
    ],
    videos: [
      {
        title: "کندل‌استیک چیست؟",
        duration: "۱۱ دقیقه",
        aparatEmbedUrl:
          "https://www.aparat.com/video/video/embed/videohash/ank4001/vt/frame",
      },
      {
        title: "حمایت و مقاومت را چگونه پیدا کنیم؟",
        duration: "۱۴ دقیقه",
        aparatEmbedUrl:
          "https://www.aparat.com/video/video/embed/videohash/wmi22k2/vt/frame",
      },
      {
        title: "تشخیص روند صعودی، نزولی و خنثی",
        duration: "۱۰ دقیقه",
        aparatEmbedUrl:
          "https://www.aparat.com/video/video/embed/videohash/wmi22k2/vt/frame",
      },
    ],
  },
  {
    id: 4,
    title: "روان‌شناسی معامله‌گری",
    description:
      "ترس، طمع و تصمیم‌گیری هیجانی می‌توانند حتی یک استراتژی خوب را بی‌اثر کنند. در این فصل، درباره ذهنیت درست و اشتباه‌های رفتاری رایج در ترید صحبت می‌کنیم.",
    icon: <GraduationCap size={22} />,
    accent: "from-orange-500 to-rose-600",
    points: [
      "کنترل هیجان هنگام سود یا زیان",
      "پرهیز از معاملات عجولانه و انتقامی",
      "اهمیت ثبت معاملات و داشتن پلن معاملاتی",
    ],
    videos: [
      {
        title: "ترس و طمع در معامله‌گری",
        duration: "۹ دقیقه",
        aparatEmbedUrl:
          "https://www.aparat.com/video/video/embed/videohash/wnf70ry/vt/frame",
      },
      {
        title: "اشتباه‌های رایج معامله‌گران تازه‌کار",
        duration: "۱۳ دقیقه",
        aparatEmbedUrl:
          "https://www.aparat.com/video/video/embed/videohash/a51u5g8/vt/frame",
      },
    ],
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.18),transparent_34%),radial-gradient(circle_at_left,rgba(124,58,237,0.16),transparent_32%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
              <GraduationCap size={18} />
              مسیر آموزش رایگان TradeLab
            </div>

            <h1 className="text-3xl font-black leading-relaxed text-white sm:text-4xl lg:text-5xl">
              آموزش ترید؛ از مفاهیم پایه
              <span className="block text-cyan-400">
                تا تمرین عملی و بدون ریسک
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              این مسیر آموزشی به شما کمک می‌کند مفاهیم اصلی بازار رمزارز، مدیریت
              سرمایه، تحلیل نمودار و اصول معامله‌گری مسئولانه را مرحله‌به‌مرحله
              یاد بگیرید.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              {courseStats.map((stat, index) => (
                <InfoChip key={index} icon={stat.icon} text={stat.text} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning content */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-12">
          <p className="text-sm font-bold text-cyan-400">مسیر یادگیری</p>
          <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
            قدم‌به‌قدم یاد بگیر و سپس تمرین کن
          </h2>
          <p className="mt-3 max-w-2xl leading-8 text-slate-400">
            فصل‌ها را به ترتیب پیش برو. پس از یادگیری مفاهیم پایه، می‌توانی
            آموخته‌هایت را در محیط معامله آزمایشی TradeLab تمرین کنی.
          </p>
        </div>

        <div className="space-y-8">
          {learningSections.map((section) => (
            <article
              key={section.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/10"
            >
              <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <SectionCard
                  id={section.id}
                  title={section.title}
                  description={section.description}
                  icon={section.icon}
                  accent={section.accent}
                  points={section.points}
                />

                {/* season videos */}
                <div className="border-t border-white/10 bg-slate-950/40 p-6 sm:p-8 lg:border-t-0 lg:border-r lg:p-10">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <h4 className="font-bold text-white">ویدیوهای این فصل</h4>

                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                      {section.videos.length.toLocaleString("fa-IR")} ویدیو
                    </span>
                  </div>

                  <div className="space-y-4">
                    {section.videos.map((video, index) => (
                      <VideoCard
                        key={video.title}
                        index={index}
                        title={video.title}
                        duration={video.duration}
                        aparatEmbedUrl={video.aparatEmbedUrl}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <section className="relative mt-16 overflow-hidden rounded-3xl border border-cyan-400/20 bg-linear-to-l from-cyan-500/15 via-blue-500/10 to-violet-500/15 p-7 sm:p-10">
          <div className="absolute -left-12 -top-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-bold text-cyan-300">
                وقت تمرین رسیده است
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">
                آموخته‌هایت را بدون ریسک مالی امتحان کن
              </h2>
              <p className="mt-3 max-w-2xl leading-8 text-slate-300">
                با کیف پول آزمایشی TradeLab می‌توانی خریدوفروش رمزارزها را تمرین
                کنی و تجربه واقعی‌تری از معامله‌گری به دست بیاوری.
              </p>
            </div>

            <Link
              href="/dashboard/trade"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              ورود به معامله آزمایشی
              <ArrowLeft size={19} />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
