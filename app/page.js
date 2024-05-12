"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { setMediaFiles } from "../utils/mediaSlice"; // Ensure you have this action creator properly defined
import "./globals.css";
import ParticlesComponent from "@/components/Particles";
import { Appbar } from "@/components/Appbar";

export default function HomePage() {
  const [mediaFile, setMediaFile] = useState([]);
  const dispatch = useDispatch();

  console.log(mediaFile);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => {
        setMediaFile(data); // Correctly update the state with fetched data
        dispatch(setMediaFiles(data)); // Assuming this is your Redux action to update the store
      })
      .catch((err) => console.error("Failed to load media", err));
  }, [dispatch]);

  return (
    <div className="">
      <ParticlesComponent id="particles" />
      <Appbar />
      <div className="grid grid-cols-3 gap-10 z-10 pt-10 px-10">
        {mediaFile.map((media, index) => (
          <Link href={`/player/${encodeURIComponent(media.url)}`} key={index}>
            <div
              key={media.name}
              className="text-white bg-[rgba(17,25,40,0.56)] backdrop-blur-[15px] backdrop-saturate-200 rounded-lg border border-[rgba(255,255,255,0.125)]"
            >
              <img
                src={media.thumbnailUrl || "/default-thumbnail.jpg"}
                alt={media.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h5 className="text-lg">{media.name}</h5>
                <p>Type: {media.type}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// "use client";
// import { MediaCard } from "@/components/Player/card";
// import Link from "next/link";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setMediaFiles } from '../store/mediaSlice'; // Ensure you have this action creator properly defined

// export default function HomePage() {
//   const [mediaFiles, setMediaFiles] = useState([]);

//   const dispatch = useDispatch();

//   const router = useRouter();
//   useEffect(() => {
//     fetch("/api/media")
//       .then((res) => res.json())
//       .then((data) => {
//         setMediaFiles;
//         dispatch(setMediaFiles(data));
//       })
//       .catch((err) => console.error("Failed to load media", err));
//   }, [dispatch]);

//   console.log(mediaFiles);

//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {mediaFiles.map((media) => (
//         <Link href={`/player/${encodeURIComponent(media.url)}`}>
//           <div key={media.name} className="card">
//             <img
//               src={media.thumbnailUrl || "/default-thumbnail.jpg"}
//               alt={media.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h5 className="text-lg">{media.name}</h5>
//               <p>Type: {media.type}</p>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

// we were sending data like this
// const mediaFiles = [
//   "/assets/Audio.mp3",
//   "/assets/videoplayback.mp4",
//   "/assets/Better Now.mp4",
//   "/assets/Mi Amor.mp4",
//   "/assets/SAFAR.mp4",
// ];

// now we are getting an array like this

// 0: "Audio.mp3"
// 1: "Better Now.mp4"
// 2: "Mi Amor.mp4"
// 3: "SAFAR.mp4"
// 4: "videoplayback.mp4"

// how to map and send data
