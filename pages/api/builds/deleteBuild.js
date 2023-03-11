import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ message: "Please sign in to delete a build." });
    }

    try {
      const buildId = req.body;
      const result = await prisma.build.delete({
        where: {
          id: buildId,
        },
      });

      res.status(200).json(result);
    } catch (err) {
      res
        .status(403)
        .json({ err: "Error has occurred while deleting a build" });
    }
  }
}
