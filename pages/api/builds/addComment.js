import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res
      .status(401)
      .json({ message: "Please signin to post a comment." });
  }
  //Get User
  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  //Add a comment - field referred to as "message" in schema.prisma
  if (req.method === "POST") {
    const { message, buildId } = req.body.data;

    if (!message.length) {
      return res.status(401).json({ message: "Please enter some text" });
    }
    try {
      const result = await prisma.comment.create({
        data: {
          message,
          userId: prismaUser.id,
          buildId,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occurred while making a post" });
    }
  }
}
