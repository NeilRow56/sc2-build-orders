"use client";

import Image from "next/image";
import Link from "next/link";

export default function BuildCard({ id, name, avatar, content, matchUp }) {
  return (
    <>
      <div className="my-8 rounded-lg bg-white p-8">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8 text-left">
          <h3 className="font-bold">Build Details:</h3>
          <p className="mb-6 break-normal">{content}</p>
          <h3 className="font-bold">Match up:</h3>
          <p className="break-normal">{matchUp}</p>
        </div>

        <div className="flex items-center gap-4 ">
          <button className="primary-button bg-red-600 text-sm font-bold text-white">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
