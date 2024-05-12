"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { setMediaFiles } from "../utils/mediaSlice";
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
        setMediaFile(data);
        dispatch(setMediaFiles(data)); //  Redux action to update the store
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
