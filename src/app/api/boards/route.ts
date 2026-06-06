import { getLiveblocksClient } from "@/lib/liveblocksClient";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const { id, update } = await req.json();
  const liveblocks = getLiveblocksClient();
  await liveblocks.updateRoom(id, update);
  return Response.json(true);
}
