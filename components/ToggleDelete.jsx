"use client";

import React from "react";

export default function ToggleDelete({ deleteBuild, setToggle }) {
  return (
    <div
      onClick={() => {
        setToggle(false);
      }}
      className="fixed left-0 top-0 z-20 h-full w-full bg-black/50 "
    >
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-6 rounded-lg bg-white p-12">
        <h2 className="text-xl">
          Are you sure you want to delete this build? 😥
        </h2>
        <h3 className="text-sm text-red-600">
          Pressing the delete button will permanently delete your build
        </h3>
        <button
          onClick={deleteBuild}
          className="rounded-md bg-red-600 py-2 px-4 text-sm text-white"
        >
          Delete Build
        </button>
      </div>
    </div>
  );
}
