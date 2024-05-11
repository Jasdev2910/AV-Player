import { useRef, useState, useEffect } from "react";

function usePlayerControls(playerRef) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false); // Initialize mute state
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
  };
}

export default usePlayerControls;

// import { useRef, useState, useEffect } from "react";

// function usePlayerControls(playerRef) {
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(1); // Default volume initially set to 100%
//   const [muted, setMuted] = useState(false); // Added muted state
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     const player = playerRef.current;

//     const handleLoadedMetadata = () => {
//       setDuration(player.duration);
//     };

//     const updateProgress = () => {
//       setCurrentTime(player.currentTime);
//     };

//     player.addEventListener("timeupdate", updateProgress);
//     player.addEventListener("loadedmetadata", handleLoadedMetadata);

//     return () => {
//       player.removeEventListener("timeupdate", updateProgress);
//       player.removeEventListener("loadedmetadata", handleLoadedMetadata);
//     };
//   }, [playerRef]);

//   const togglePlayPause = () => {
//     const player = playerRef.current;
//     if (player.paused) {
//       player.play();
//     } else {
//       player.pause();
//     }
//     setPlaying(!playing);
//   };

//   const toggleMute = () => {
//     // Added toggle mute function
//     const player = playerRef.current;
//     if (player.muted) {
//       player.muted = false;
//       player.volume = volume; // Restore the previous volume
//     } else {
//       player.muted = true;
//       player.volume = 0; // Set volume to 0 when muted
//     }
//     setMuted(!muted);
//   };

//   const skip = (time) => {
//     const player = playerRef.current;
//     player.currentTime += time;
//   };

//   const changeVolume = (newVolume) => {
//     const player = playerRef.current;
//     player.volume = newVolume;
//     setVolume(newVolume);
//     if (newVolume === 0) {
//       player.muted = true;
//       setMuted(true);
//     } else if (muted) {
//       player.muted = false;
//       setMuted(false);
//     }
//   };

//   const changePlaybackRate = (rate) => {
//     const player = playerRef.current;
//     player.playbackRate = rate;
//     setPlaybackRate(rate);
//   };

//   const seek = (time) => {
//     const player = playerRef.current;
//     player.currentTime = time;
//   };

//   return {
//     playing,
//     togglePlayPause,
//     volume,
//     changeVolume,
//     setMuted,
//     toggleMute,
//     playbackRate,
//     changePlaybackRate,
//     skip,
//     currentTime,
//     duration,
//     seek,
//   };
// }

// export default usePlayerControls;

// import { useRef, useState, useEffect } from "react";

// function usePlayerControls(playerRef) {
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   useEffect(() => {
//     const player = playerRef.current;

//     const handleLoadedMetadata = () => {
//       setDuration(player.duration);
//     };

//     const updateProgress = () => {
//       setCurrentTime(player.currentTime);
//     };

//     player.addEventListener("timeupdate", updateProgress);
//     player.addEventListener("loadedmetadata", handleLoadedMetadata);

//     return () => {
//       player.removeEventListener("timeupdate", updateProgress);
//       player.removeEventListener("loadedmetadata", handleLoadedMetadata);
//     };
//   }, [playerRef]);

//   const togglePlayPause = () => {
//     const player = playerRef.current;
//     if (player.paused) {
//       player.play();
//     } else {
//       player.pause();
//     }
//     setPlaying(!playing);
//   };

//   const skip = (time) => {
//     const player = playerRef.current;
//     player.currentTime += time;
//   };

//   const changeVolume = (newVolume) => {
//     const player = playerRef.current;
//     player.volume = newVolume;
//     setVolume(newVolume);
//   };

//   const changePlaybackRate = (rate) => {
//     const player = playerRef.current;
//     player.playbackRate = rate;
//     setPlaybackRate(rate);
//   };

//   const seek = (time) => {
//     const player = playerRef.current;
//     player.currentTime = time;
//   };

//   return {
//     playing,
//     togglePlayPause,
//     volume,
//     changeVolume,
//     playbackRate,
//     changePlaybackRate,
//     skip,
//     currentTime,
//     duration,
//     seek,
//   };
// }

// export default usePlayerControls;

// import { useState, useEffect } from "react";

// function usePlayerControls(playerRef) {
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(1);
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [currentTime, setCurrentTime] = useState(0);

//   useEffect(() => {
//     const player = playerRef.current;

//     const updateProgress = () => setCurrentTime(player.currentTime);
//     player.addEventListener("timeupdate", updateProgress);

//     return () => {
//       player.removeEventListener("timeupdate", updateProgress);
//     };
//   }, [playerRef]);

//   const togglePlayPause = () => {
//     const player = playerRef.current;
//     if (player.paused) {
//       player.play();
//     } else {
//       player.pause();
//     }
//     setPlaying(!playing);
//   };

//   const skip = (time) => {
//     const player = playerRef.current;
//     player.currentTime += time;
//   };

//   const changeVolume = (newVolume) => {
//     const player = playerRef.current;
//     player.volume = newVolume;
//     setVolume(newVolume);
//   };

//   const changePlaybackRate = (rate) => {
//     const player = playerRef.current;
//     player.playbackRate = rate;
//     setPlaybackRate(rate);
//   };

//   return {
//     playing,
//     togglePlayPause,
//     volume,
//     changeVolume,
//     playbackRate,
//     changePlaybackRate,
//     skip,
//     currentTime,
//     setCurrentTime,
//   };
// }

// export default usePlayerControls;
