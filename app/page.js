import dynamic from "next/dynamic";

const DynamicPlayer = dynamic(() => import("@/components/Player/index"), {
  ssr: false, // This will only render the component on the client-side
});

export default function HomePage() {
  const audio = "/assets/Audio.mp3"; // Correct the path to use absolute from the public directory
  const video = "/assets/videoplayback.mp4"; // Same correction here

  return (
    <div>
      <h1>Media Player</h1>
      {/* Uncomment to use audio player dynamically */}
      {/* <DynamicPlayer url={audio} /> */}
      <DynamicPlayer url={video} />
    </div>
  );
}
