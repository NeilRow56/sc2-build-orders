"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export default function CreateBuild() {
  const [content, setContent] = useState("");
  const [matchUp, setMatchUp] = useState("ZvT");
  const [isDisabled, setIsDisabled] = useState(false);

  //Create a build
  const { mutate } = useMutation(
    async ({ matchUp, content }) =>
      await axios.post("/api/builds/addBuild", { matchUp, content }),
    {
      onError: (error) => {
        console.lor(error);
      },
      onSuccess: (data) => {
        console.log(data);
        setContent("");
        setMatchUp("ZvT");
        setIsDisabled(false);
      },
    }
  );

  const submitBuild = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate({ matchUp, content });
  };

  return (
    <section>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1 className="text-2xl text-white">Submit a Build Order</h1>
        <form
          onSubmit={submitBuild}
          className="flex w-[1000px] flex-col items-center justify-center gap-4"
        >
          <label htmlFor="match-up-select">Match Up</label>
          <select
            value={matchUp}
            onChange={(e) => setMatchUp(e.target.value)}
            required
            id="match-up-select"
            className="block w-[65px] rounded-lg border-2 border-gray-300 bg-gray-50 p-1 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value="zvt">ZvT</option>
            <option value="zvp">ZvP</option>
            <option value="zvz">ZvZ</option>
            <option value="pvt">PvT</option>
            <option value="pvp">PvP</option>
            <option value="pvz">PvZ</option>
            <option value="tvt">TvT</option>
            <option value="tvp">TvP</option>
            <option value="tvz">TvZ</option>
          </select>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            name="content"
            value={content}
            placeholder="Build information"
            className="h-[160px] w-[600px] rounded-md p-2 text-slate-800"
          />
          <div className=" flex flex-col items-center justify-between gap-2">
            <p
              className={`text-sm font-bold ${
                content.length > 300 ? "text-red-700" : "text-green-700"
              } `}
            >{`${content.length}/300`}</p>
            <button
              disabled={isDisabled}
              className="rounded-xl bg-teal-600 py-2 px-6 text-sm text-white disabled:opacity-25"
              type="submit"
            >
              Create build
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
