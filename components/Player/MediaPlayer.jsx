"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicPlayer = dynamic(() => import("./index"), {
  ssr: false, // This will only render the component on the client-side
});

export default function MediaPlayer({ url }) {
  const router = useRouter();
  const mediaFiles = useSelector((state) => state.media.mediaFiles); // Accessing media files from the store
  const [currentIndex, setCurrentIndex] = useState(0); // Current media index

  // Find the initial index and setup
  useEffect(() => {
    const initialIndex = mediaFiles.findIndex((file) => file.url === url);
    if (initialIndex !== -1) {
      setCurrentIndex(initialIndex);
    }
  }, [url, mediaFiles]);

  const navigateMedia = (index) => {
    if (index >= 0 && index < mediaFiles.length) {
      router.push(`/player/${encodeURIComponent(mediaFiles[index].url)}`);
    }
  };

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % mediaFiles.length; // Wrap around the array
    navigateMedia(nextIndex);
  };

  const playPrevious = () => {
    const prevIndex =
      (currentIndex - 1 + mediaFiles.length) % mediaFiles.length; // Wrap around to the last if at the first item
    navigateMedia(prevIndex);
  };

  return (
    <div className="flex justify-center items-center mt-16 ">
      <DynamicPlayer
        url={url}
        onPlayNext={playNext}
        onPlayPrevious={playPrevious}
      />
    </div>
  );
}

// import dynamic from "next/dynamic";
// import { useState } from "react";

// const DynamicPlayer = dynamic(() => import("./index"), {
//   ssr: false, // This will only render the component on the client-side
// });

// export default function MediaPlayer({ url }) {
//   // const [currentIndex, setCurrentIndex] = useState(0); // Current media index
//   // const [url, setUrl] = useState(mediaFiles[currentIndex]); // URL to play

//   // const playNext = () => {
//   //   const nextIndex = (currentIndex + 1) % mediaFiles.length; // Wrap around the array
//   //   setCurrentIndex(nextIndex);
//   //   setUrl(mediaFiles[nextIndex]);
//   // };

//   // const playPrevious = () => {
//   //   const prevIndex =
//   //     (currentIndex - 1 + mediaFiles.length) % mediaFiles.length; // Wrap around to the last if at the first item
//   //   setCurrentIndex(prevIndex);
//   //   setUrl(mediaFiles[prevIndex]);
//   // };

//   return (
//     <div>
//       <h1>Media Player</h1>

//       <DynamicPlayer
//         url={url}
//         // onPlayNext={playNext}
//         // onPlayPrevious={playPrevious}
//       />
//     </div>
//   );
// }
