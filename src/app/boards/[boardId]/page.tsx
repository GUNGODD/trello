import Board from "@/components/Board";
import Header from "@/components/Header";
import { getLiveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";

type PageProps = {
  params: {
    boardId: string;
  };
};

export default async function BoardPage(props: PageProps) {
  const boardId = props.params.boardId;
  const userEmail = await getUserEmail();
  const liveblocks = getLiveblocksClient();
  const boardInfo = await liveblocks.getRoom(boardId);
  const userAccess = boardInfo.usersAccesses?.[userEmail];
  const hasAccess = userAccess && [...userAccess].includes("room:write");
  if (!hasAccess) {
    return <div>Access denied</div>;
  }
  return (
    <>
      <Header />
      <main className="p-4 md:p-8">
        <Board
          name={boardInfo.metadata.boardName.toString()}
          id={boardId}
          background={boardInfo.metadata.background?.toString() || ""}
        />
      </main>
    </>
  );
}
