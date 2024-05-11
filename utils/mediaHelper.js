"use client";
// Path: utils/mediaHelper.js
export function isAudio(url) {
  return /\.(mp3|wav|m4a)$/i.test(url);
}

export function isVideo(url) {
  return /\.(mp4|mov|avi)$/i.test(url);
}
