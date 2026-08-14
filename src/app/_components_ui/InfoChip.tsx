// src/components/ui/InfoChip.tsx
import { LucideIcon } from "lucide-react";

interface InfoChipProps {
  icon: LucideIcon;
  text: string;
}

export const InfoChip = ({ icon: Icon, text }: InfoChipProps) => {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
      <Icon size={17} className="text-cyan-400" />
      <span className="text-sm">{text}</span>
    </div>
  );
};
