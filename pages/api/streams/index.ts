import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
    query,
  } = req;
  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, stream });
  } else if (req.method === "GET") {
    let page =
      query.page && query.page !== undefined ? +query.page.toString() : 1;
    let skip: number = (page - 1) * 10;
    const streams = await client.stream.findMany({
      take: 10,
      skip,
      orderBy: {
        createdAt: "asc",
      },
    });
    const allCount = await client.stream.count({
      select: {
        _all: true,
      },
    });
    res.json({ ok: true, streams, allCount });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
