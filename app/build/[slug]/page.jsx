"use client";

import BuildCard from "@/components/BuildCard";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddComment from "@/components/AddComment";

//Fetch build
const fetchBuildDetails = async (slug) => {
  const response = await axios.get(`/api/builds/${slug}`);
  return response.data;
};

export default function BuildDetail(url) {
  const { data, isLoading } = useQuery({
    queryKey: ["detail-build"],
    queryFn: () => fetchBuildDetails(url.params.slug),
  });
  if (isLoading) return "Loading...";

  return (
    <div className="container mx-auto mt-12 px-24">
      <BuildCard
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        content={data?.content}
        matchUp={data?.matchUp}
        comments={data?.comments}
      />
      <AddComment id={data?.id} />
      {data?.comments?.map((comment) => (
        <div className="my-6 rounded-md bg-white p-8" key={comment.id}>
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
