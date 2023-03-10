"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditBuild from "./EditBuild";

const fetchAuthBuilds = async () => {
  const response = await axios.get("/api/builds/authBuilds");
  return response.data;
};

export default function MyBuilds() {
  const { data, isLoading } = useQuery({
    queryFn: fetchAuthBuilds,
    queryKey: ["auth-builds"],
  });
  if (isLoading) return <h1>Builds are loading...</h1>;

  return (
    <div>
      {data?.builds?.map((build) => (
        <EditBuild
          id={build.id}
          key={build.id}
          avatar={data.image}
          name={data.name}
          content={build.content}
          matchUp={build.matchUp}
          comments={build.comments}
        />
      ))}
    </div>
  );
}
