import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to create a build." });

    const matchUp = req.body.matchUp;
    const content = req.body.content;

    //Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (content.length > 300) {
      return res.status(403).json({ message: "Please write a shorter build" });
    }
    if (!content.length) {
      return res
        .status(403)
        .json({ message: "Please write something before we can post it." });
    }
    //Create Build
    try {
      const result = await prisma.build.create({
        data: {
          matchUp,
          content,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occurred while making a build" });
    }
  }
}
