"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Logged({ image }) {
  return (
    <li className="flex items-center gap-8">
      <button
        className="rounded-md bg-gray-700 px-6 py-2 text-sm text-white "
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={44}
          height={44}
          className="w-10 rounded-full"
          src={image}
          alt=""
          priority
        />
      </Link>
    </li>
  );
}
