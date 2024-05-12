import { useRef, useState, useEffect } from "react";

function usePlayerControls(playerRef, containerRef) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    player.muted = muted;

    const handleLoadedMetadata = () => {
      if (player) {
        setDuration(player.duration);
      }
    };

    const updateProgress = () => {
      if (player) {
        setCurrentTime(player.currentTime);
      }
    };

    const handleKeyDown = (event) => {
      if (!player) return; // Ensure player is available before processing keys

      switch (event.key) {
        case " ":
          togglePlayPause();
          break;
        case "ArrowUp":
          changeVolume(Math.min(volume + 0.1, 1));
          break;
        case "ArrowDown":
          changeVolume(Math.max(volume - 0.1, 0));
          break;
        case "ArrowRight":
          skip(10);
          break;
        case "ArrowLeft":
          skip(-10);
          break;
        case "m":
        case "M":
          toggleMute();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "Escape":
          if (isFullscreen) {
            toggleFullscreen();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    player.addEventListener("timeupdate", updateProgress);
    player.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (player) {
        player.removeEventListener("timeupdate", updateProgress);
        player.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [playerRef, muted, playing, volume, isFullscreen]);

  useEffect(() => {
    const showControls = () => {
      setControlsVisible(true);
      clearTimeout(controlsTimeoutRef.current);
      if (!playing) return;
      controlsTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000); // hide controls after 3 seconds of inactivity
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", showControls);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", showControls);
      }
    };
  }, [playing]);

  const togglePlayPause = () => {
    const player = playerRef.current;
    if (player.paused) {
      player.play();
      setPlaying(true);
    } else {
      player.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const changeVolume = (newVolume) => {
    const player = playerRef.current;
    player.volume = newVolume;
    setVolume(newVolume);
  };

  const skip = (time) => {
    const player = playerRef.current;
    player.currentTime += time;
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
    const elem = containerRef.current; // Adjusted to target the containerRef directly

    if (!document.fullscreenElement) {
      elem
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => setIsFullscreen(false));
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
    controlsVisible,
  };
}

export default usePlayerControls;
