import Link from "next/link";
import React from "react";
import { IoIosMusicalNotes } from "react-icons/io";

export function Appbar({ title, thumbnailUrl, url }) {
  return (
    <div className="h-16 w-full flex items-center text-white bg-[rgba(17,25,40,0.56)] backdrop-blur-[15px] backdrop-saturate-200 border border-[rgba(255,255,255,0.125)]">
      <Link href={"/"}>
        <div className="flex items-center pl-4">
          <IoIosMusicalNotes size={32} />
          <span className="text-xl">Music</span>
        </div>
      </Link>
    </div>
  );
}
