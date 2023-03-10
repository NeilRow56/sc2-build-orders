"use client";
import Image from "next/image";
import { useState } from "react";

export default function EditBuild({
  avatar,
  name,
  content,
  matchUp,
  comments,
  id,
}) {
  return (
    <>
      <div className="my-8 rounded-lg bg-white p-8">
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
            className="rounded-full"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8 ">
          <p className="break-all">{content}</p>
        </div>
        <div className="my-8 ">
          <p className="break-all">{matchUp}</p>
        </div>

        <div className="flex items-center gap-4 ">
          <p className=" text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
          <button className="text-sm font-bold text-red-500">Delete</button>
        </div>
      </div>
    </>
  );
}
