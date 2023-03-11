"use client";

import BuildCard from "@/components/BuildCard";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    </div>
  );
}
