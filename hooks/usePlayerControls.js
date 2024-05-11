import { useRef, useState, useEffect } from "react";

function usePlayerControls(playerRef, containerRef) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false); // Initialize mute state
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const player = playerRef.current;

    // Ensure the player reflects the current muted state
    player.muted = muted;

    const handleLoadedMetadata = () => {
      setDuration(player.duration);
    };

    const updateProgress = () => {
      setCurrentTime(player.currentTime);
    };

    player.addEventListener("timeupdate", updateProgress);
    player.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      player.removeEventListener("timeupdate", updateProgress);
      player.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [playerRef, muted]);

  const togglePlayPause = () => {
    const player = playerRef.current;
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const skip = (time) => {
    const player = playerRef.current;
    player.currentTime += time;
  };

  const changeVolume = (newVolume) => {
    const player = playerRef.current;
    player.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0 && muted) {
      setMuted(false); // Automatically unmute if the user increases the volume
    }
  };

  const changePlaybackRate = (rate) => {
    const player = playerRef.current;
    player.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const seek = (time) => {
    const player = playerRef.current;
    player.currentTime = time;
  };

  const toggleFullscreen = () => {
    const elem = playerRef.current.parentNode; // Assuming the parent node is the container for the whole player

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        // Safari
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        // IE11
        elem.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        // Safari
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE11
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return {
    playing,
    togglePlayPause,
    volume,
    changeVolume,
    muted,
    toggleMute,
    playbackRate,
    changePlaybackRate,
    skip,
    currentTime,
    duration,
    seek,
    toggleFullscreen,
    isFullscreen,
  };
}

export default usePlayerControls;
