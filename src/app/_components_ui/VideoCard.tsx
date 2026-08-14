"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import VideoModal from "./VideoModal";

interface VideoCardProps {
  index: number;
  title: string;
  duration: string;
  src?: string;
  aparatEmbedUrl?: string;
}

export const VideoCard = ({
  index,
  title,
  duration,
  src,
  aparatEmbedUrl,
}: VideoCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasVideo = Boolean(src || aparatEmbedUrl);

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-4 transition duration-300 hover:border-cyan-400/35 hover:bg-slate-800">
        <div className="flex gap-4">
          {/* imge */}
          <button
            type="button"
            onClick={() => hasVideo && setIsOpen(true)}
            disabled={!hasVideo}
            className=" cursor-pointer flex aspect-video w-28 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-800 transition disabled:cursor-not-allowed sm:w-36 enabled:hover:border-cyan-400/50 enabled:hover:bg-slate-700"
          >
            <Play
              size={24}
              className="fill-cyan-400 text-cyan-400 opacity-80"
            />
          </button>

          {/* video info */}
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>ویدیو {(index + 1).toLocaleString("fa-IR")}</span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span>{duration}</span>
            </div>

            <h5 className="mt-2 text-sm font-bold leading-6 text-slate-200">
              {title}
            </h5>

            {hasVideo ? (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="mt-1 text-right text-xs text-cyan-400 hover:underline"
              >
                پخش ویدیو
              </button>
            ) : (
              <p className="mt-1 text-xs text-cyan-400">
                ویدیو به‌زودی بارگذاری می‌شود
              </p>
            )}
          </div>
        </div>
      </div>

      {hasVideo && (
        <VideoModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          src={src}
          aparatEmbedUrl={aparatEmbedUrl}
        />
      )}
    </>
  );
};
