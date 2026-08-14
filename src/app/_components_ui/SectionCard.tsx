import { CheckCircle2 } from "lucide-react";

interface SectionCardProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  points: string[];
}

export const SectionCard = ({
  id,
  title,
  description,
  icon,
  accent,
  points,
}: SectionCardProps) => {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${accent} text-white shadow-lg`}
        >
          {icon}
        </div>

        <div>
          <span className="text-xs font-bold text-slate-500">
            فصل {id.toLocaleString("fa-IR")}
          </span>
          <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
            {title}
          </h3>
        </div>
      </div>

      <p className="mt-6 leading-8 text-slate-300">{description}</p>

      <div className="mt-7">
        <p className="mb-4 text-sm font-bold text-white">
          در این فصل یاد می‌گیری:
        </p>

        <ul className="space-y-3">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm leading-7 text-slate-400"
            >
              <CheckCircle2
                size={19}
                className="mt-1 shrink-0 text-emerald-400"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
