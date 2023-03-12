" use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

import React from "react";

export default function AddComment({ id }) {
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let messageToastId;

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async (data) => {
      return axios.post("/api/builds/addComment", { data });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["detail-build"]);
        setMessage("");
        setIsDisabled(false);
        toast.success("Added your comment", { id: messageToastId });
      },
      onError: (error) => {
        console.log(error);
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: messageToastId });
        }
      },
    }
  );

  const submitComment = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    messageToastId = toast.success(
      "Adding your comment",

      {
        id: messageToastId,
      }
    );
    mutate({ message, buildId: id });
  };
  return (
    <form onSubmit={submitComment} className="my-8">
      <h3 className="text-xl">Add a comment</h3>
      <div className="my-2 flex flex-col">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type="text"
          name="content"
          className="my-2 rounded-md p-4 text-lg"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" rounded-xl bg-teal-600 py-2 px-6 text-sm text-white disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold  ${
            message.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${message.length}/300`}</p>
      </div>
    </form>
  );
}
