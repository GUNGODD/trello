import BoardsTiles from "@/components/BoardsTiles";
import { getLiveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";

export default async function Boards() {
  const email = await getUserEmail();
  const liveblocks = getLiveblocksClient();
  const { data: rooms } = await liveblocks.getRooms({ userId: email });
  return <BoardsTiles boards={rooms} />;
}
