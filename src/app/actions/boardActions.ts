"use server";

import { authOptions } from "@/lib/authOptions";
import { getLiveblocksClient } from "@/lib/liveblocksClient";
import { RoomInfo } from "@liveblocks/node";
import { getServerSession } from "next-auth";
import uniqid from "uniqid";

export async function createBoard(name: string): Promise<false | RoomInfo> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "";
  if (email) {
    const liveblocks = getLiveblocksClient();
    const roomId = uniqid.time();
    return await liveblocks.createRoom(roomId, {
      defaultAccesses: [],
      usersAccesses: {
        [email]: ["room:write"],
      },
      metadata: {
        boardName: name,
      },
    });
  }

  return false;
}

export async function addEmailToBoard(boardId: string, email: string) {
  const liveblocks = getLiveblocksClient();
  const room = await liveblocks.getRoom(boardId);
  const usersAccesses = room.usersAccesses;
  usersAccesses[email] = ["room:write"];
  await liveblocks.updateRoom(boardId, { usersAccesses });
  return true;
}

export async function updateBoard(boardId: string, updateData: any) {
  const liveblocks = getLiveblocksClient();
  await liveblocks.updateRoom(boardId, updateData);
  return true;
}

export async function removeEmailFromBoard(boardId: string, email: string) {
  const liveblocks = getLiveblocksClient();
  const room = await liveblocks.getRoom(boardId);
  const usersAccesses: any = room.usersAccesses;
  usersAccesses[email] = null;
  await liveblocks.updateRoom(boardId, { usersAccesses });
  return true;
}

export async function deleteBoard(boardId: string) {
  const liveblocks = getLiveblocksClient();
  await liveblocks.deleteRoom(boardId);
  return true;
}
