"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicPlayer = dynamic(() => import("@/components/Player/index"), {
  ssr: false, // This will only render the component on the client-side
});

export default function HomePage() {
  const mediaFiles = [
    "/assets/Audio.mp3",
    "/assets/videoplayback.mp4",
    "/assets/Better Now.mp4",
    "/assets/Mi Amor.mp4",
    "/assets/SAFAR.mp4",
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Current media index
  const [url, setUrl] = useState(mediaFiles[currentIndex]); // URL to play

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % mediaFiles.length; // Wrap around the array
    setCurrentIndex(nextIndex);
    setUrl(mediaFiles[nextIndex]);
  };

  const playPrevious = () => {
    const prevIndex =
      (currentIndex - 1 + mediaFiles.length) % mediaFiles.length; // Wrap around to the last if at the first item
    setCurrentIndex(prevIndex);
    setUrl(mediaFiles[prevIndex]);
  };

  const audio = "/assets/Audio.mp3"; // Correct the path to use absolute from the public directory
  const video = "/assets/videoplayback.mp4"; // Same correction here

  return (
    <div>
      <h1>Media Player</h1>
      {/* Uncomment to use audio player dynamically */}
      {/* <DynamicPlayer url={audio} /> */}
      <DynamicPlayer
        url={url}
        onPlayNext={playNext}
        onPlayPrevious={playPrevious}
      />
    </div>
  );
}
