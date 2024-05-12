"use client";
import { Appbar } from "@/components/Appbar";
import ParticlesComponent from "@/components/Particles";
// import MediaPlayer from "@/components/Player/MediaPlayer";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const DynamicPlayer = dynamic(() => import("@/components/Player/MediaPlayer"), {
  ssr: false,
});

export default function Player() {
  const params = useParams();
  console.log(params);
  const decodedMediaURL = decodeURIComponent(params.id);
  console.log(decodedMediaURL);
  return (
    <div>
      <ParticlesComponent />
      <Appbar />
      <DynamicPlayer url={decodedMediaURL} />
    </div>
  );
}
