"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import BuildCard from "./BuildCard";

//Fetch all builds

const fetchAllBuilds = async () => {
  const response = await axios.get("/api/builds/getBuilds");

  return response.data;
};

export default function Builds() {
  const { data, error, isLoading } = useQuery({
    queryFn: fetchAllBuilds,
    queryKey: ["builds"],
  });
  if (error) return error;
  if (isLoading) return <h1>Builds are loading...</h1>;

  return (
    <div className="mx-auto max-w-[1000px] text-center">
      <h1 className="pt-4 text-4xl font-bold text-teal-800">All Builds</h1>

      {data?.map((build) => (
        <BuildCard
          id={build.id}
          key={build.id}
          avatar={build.user.image}
          name={build.user.name}
          content={build.content}
          matchUp={build.matchUp}
          comments={build.comments}
        />
      ))}
    </div>
  );
}
