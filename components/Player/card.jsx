import React from "react";

export function MediaCard({ title, thumbnailUrl, url }) {
  //   const {  } = media;

  return (
    <div className="w-[300px] h-[300px] bg-slate-300">
      <img src={thumbnailUrl} alt="Img" className="thumbnail" />
      <div className="title">{title}</div>
    </div>
  );
}
