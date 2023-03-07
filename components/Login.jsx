"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <li>
      <button
        onClick={() => signIn()}
        className="rounded-md bg-gray-700 px-6 py-2 text-sm text-white "
      >
        Sign In
      </button>
    </li>
  );
}
