"use client";

import Image from "next/image";
import Link from "next/link";

export default function BuildCard({
  id,
  name,
  avatar,
  content,
  matchUp,
  comments,
}) {
  return (
    <>
      <div className="my-6 rounded-lg bg-white p-8">
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
        <div className="my-4 text-left">
          <h3 className="font-bold">Build Details:</h3>
          <p className="mb-6 break-normal">{content}</p>
          <h3 className="font-bold">Match up:</h3>
          <p className="break-normal">{matchUp}</p>
        </div>
        <div className=" text-left text-teal-700">
          <h3 className="font-bold">Comments:</h3>
        </div>
        <div className="flex cursor-pointer items-center">
          <Link
            href={{
              pathname: `/build/${id}`,
            }}
          >
            <p className=" mb-2 text-sm  text-gray-700">
              {comments?.length} Comments
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
