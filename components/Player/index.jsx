"use client";

import React, { useEffect, useRef, useState } from "react";
import { isAudio, isVideo } from "../../utils/mediaHelper";
import usePlayerControls from "../../hooks/usePlayerControls";
import { CgArrowsExpandRight, CgPlayButtonO } from "react-icons/cg";
import { FaCompress, FaPauseCircle } from "react-icons/fa";
import { MdForward10, MdReplay10 } from "react-icons/md";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";
import { BiSkipPrevious } from "react-icons/bi";
import { BiSkipNext } from "react-icons/bi";

const Player = ({ url, onPlayNext, onPlayPrevious }) => {
  const containerRef = useRef(null);
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
    toggleFullscreen,
    isFullscreen,
  } = usePlayerControls(playerRef, containerRef);

  useEffect(() => {
    // Reload the media source when URL changes
    playerRef.current.load();
  }, [url]);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const handleVolumeChange = (e) => {
    changeVolume(parseFloat(e.target.value));
  };

  const isMediaFile = isAudio(url) || isVideo(url); // Check if the URL is either video or audio

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowTools(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setShowTools(false);
        }, 2000)
      }
      className="max-w-3xl mx-auto w-full text-center text-white bg-[rgba(17,25,40,0.56)] backdrop-blur-[15px] backdrop-saturate-200 rounded-lg border border-[rgba(255,255,255,0.125)]"
    >
      <h1 className="text-white">Media Player</h1>
      {isMediaFile && (
        <div className={"aspect-w-16 aspect-h-9 bg-black relative"}>
          <div
            onClick={togglePlayPause}
            className="w-full h-full bg-transparent absolute z-10"
          ></div>
          <video ref={playerRef} className="w-full h-full" playsInline>
            <source src={url} type={isAudio(url) ? "audio/mp3" : "video/mp4"} />
            Your browser does not support the video element.
          </video>
          {showTools && (
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
              <div className="flex justify-between px-2 py-1">
                <div className="flex">
                  <button onClick={onPlayPrevious}>
                    <BiSkipPrevious size={32} />
                  </button>
                  <button onClick={togglePlayPause} className="text-3xl">
                    {playing ? <CgPlayButtonO /> : <FaPauseCircle />}
                  </button>
                  <button onClick={onPlayNext}>
                    <BiSkipNext size={32} />
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
                        id="small-range"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider mx-2 w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm "
                      />
                    )}
                  </div>
                </div>
                <div className="flex px-2">
                  <select
                    value={playbackRate}
                    onChange={(e) =>
                      changePlaybackRate(parseFloat(e.target.value))
                    }
                    className="bg-transparent text-white p-1 rounded"
                  >
                    {[0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4].map((rate) => (
                      <option className="text-black" key={rate} value={rate}>
                        {rate}x
                      </option>
                    ))}
                  </select>
                  <button className="px-2" onClick={toggleFullscreen}>
                    {isFullscreen ? (
                      <FaCompress size={24} />
                    ) : (
                      <CgArrowsExpandRight size={24} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Player;
