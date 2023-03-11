import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.build.findUnique({
        where: {
          id: req.query.buildDetails,
        },
        include: {
          user: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: true,
            },
          },
        },
      });

      return res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error has occurred while fetching build" });
    }
  }
}
