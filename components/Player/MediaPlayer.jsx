"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";

const DynamicPlayer = dynamic(() => import("./index"), {
  ssr: false,
});

export default function MediaPlayer({ url }) {
  const router = useRouter();
  const mediaFiles = useSelector((state) => state.media.mediaFiles);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const initialIndex = mediaFiles.findIndex((file) => file.url === url);
    if (initialIndex !== -1) {
      setCurrentIndex(initialIndex);
    }
  }, [url, mediaFiles]);

  const navigateMedia = useCallback(
    (index) => {
      if (index >= 0 && index < mediaFiles.length) {
        router.push(`/player/${encodeURIComponent(mediaFiles[index].url)}`);
      }
    },
    [mediaFiles, router]
  );

  const playNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % mediaFiles.length;
    navigateMedia(nextIndex);
  }, [currentIndex, mediaFiles.length, navigateMedia]);

  const playPrevious = useCallback(() => {
    const prevIndex =
      (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
    navigateMedia(prevIndex);
  }, [currentIndex, mediaFiles.length, navigateMedia]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "N":
        case "n":
          playNext();
          break;
        case "P":
        case "p":
          playPrevious();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [playNext, playPrevious]);

  return (
    <div className="flex justify-center items-center mt-8">
      <h1 className="text-white">Media Player</h1>
      <DynamicPlayer
        url={url}
        onPlayNext={playNext}
        onPlayPrevious={playPrevious}
      />
    </div>
  );
}
