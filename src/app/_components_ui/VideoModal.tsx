"use client";

import { X } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  src?: string;
  aparatEmbedUrl?: string;
};

export default function VideoModal({
  isOpen,
  onClose,
  src,
  aparatEmbedUrl,
}: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        aria-label="Close"
      >
        <X size={28} />
      </button>

      <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <VideoPlayer src={src} aparatEmbedUrl={aparatEmbedUrl} />
      </div>
    </div>
  );
}
