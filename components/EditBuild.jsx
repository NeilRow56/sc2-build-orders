"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Image from "next/image";
import ToggleDelete from "./ToggleDelete";
import { useState } from "react";
import axios from "axios";

export default function EditBuild({
  avatar,
  name,
  content,
  matchUp,
  comments,
  id,
}) {
  //Toggle
  const [toggle, setToggle] = useState(false);

  //Delete Build
  const queryClient = useQueryClient();
  let deleteToastID;

  const { mutate } = useMutation(
    async (id) => await axios.delete("/api/builds/deleteBuild", { data: id }),
    {
      onError: (error) => {
        console.log(error);
        toast.error("Error deleting that build", { id: deleteToastID });
      },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("auth-builds");
        toast.success("Build has been deleted.", {
          duration: 3000,
          id: deleteToastID,
        });
      },
    }
  );

  const deleteBuild = () => {
    deleteToastID = toast.success("Deleting your build.", {
      id: deleteToastID,
    });

    mutate(id);
  };

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
          <button
            onClick={() => {
              setToggle(true);
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && (
        <ToggleDelete deleteBuild={deleteBuild} setToggle={setToggle} />
      )}
    </>
  );
}
