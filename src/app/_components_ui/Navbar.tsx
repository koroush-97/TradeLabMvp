// @ components
import Link from "next/link";
import { Button } from "./Button";

const navLinks = [
  { title: "امکانات", href: "#features" },
  { title: "درباره پروژه", href: "#about" },
  { title: "شروع", href: "#cta" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 font-black text-primary">
            T
          </div>

          <div className="leading-tight">
            <h1 className="text-base font-bold">TradeLab</h1>
            <p className="text-xs text-muted">تمرین ترید بدون ریسک</p>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <Button variant="primary" href="/login">
          ورود / ثبت نام
        </Button>
      </div>
    </header>
  );
}
