"use client";

import React, { useRef, useState } from "react";
import { isAudio, isVideo } from "../../utils/mediaHelper";
import usePlayerControls from "../../hooks/usePlayerControls";
import { CgPlayButtonO } from "react-icons/cg";
import { FaPauseCircle } from "react-icons/fa";
import { MdForward10, MdReplay10 } from "react-icons/md";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";

const Player = ({ url }) => {
  const playerRef = useRef(null);
  const {
    playing,
    togglePlayPause,
    volume,
    changeVolume,
    muted,
    toggleMute,
    skip,
    playbackRate,
    changePlaybackRate,
    currentTime,
    duration,
    seek,
  } = usePlayerControls(playerRef);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const handleVolumeChange = (e) => {
    changeVolume(parseFloat(e.target.value));
  };

  const isMediaFile = isAudio(url) || isVideo(url); // Check if the URL is either video or audio

  return (
    <div className="max-w-2xl h-12 mx-auto w-full">
      {isMediaFile && (
        <div className={"aspect-w-16 aspect-h-9 bg-black relative"}>
          <video ref={playerRef} className="w-full h-full" playsInline>
            <source src={url} type={isAudio(url) ? "audio/mp3" : "video/mp4"} />
            Your browser does not support the video element.
          </video>
          <div className="absolute w-full -mt-14 bg-transparent text-white z-20">
            <div className="flex items-center px-2">
              <input
                id="small-range"
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => seek(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm "
              />
              <div className="text-xs w-20 justify-center items-center flex">
                {Math.round(currentTime)}s / {Math.round(duration)}s
              </div>
            </div>
            <div className="flex px-2 py-1">
              <button onClick={togglePlayPause} className="text-3xl">
                {playing ? <FaPauseCircle /> : <CgPlayButtonO />}
              </button>
              <button onClick={() => skip(-10)} className="text-2xl">
                <MdReplay10 />
              </button>
              <button onClick={() => skip(10)} className="text-2xl">
                <MdForward10 />
              </button>
              <div
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="flex justify-between items-center"
              >
                <button onClick={toggleMute} className="text-2xl">
                  {muted ? <FaVolumeXmark /> : <FaVolumeHigh />}
                </button>
                {showVolumeSlider && (
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider mx-2"
                  />
                )}
              </div>
              <select
                value={playbackRate}
                onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                className="bg-gray-700 text-white p-1 rounded"
              >
                {[0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}x
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
