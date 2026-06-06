import BoardDeleteButton from "@/components/BoardDeleteButton";
import EmailsAccessList from "@/components/EmailsAccessList";
import Header from "@/components/Header";
import NewBoardAccess from "@/components/forms/NewBoardAccessForm";
import { getLiveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/userClient";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type PageProps = {
  params: {
    boardId: string;
  };
};

export default async function BoardSettings({ params }: PageProps) {
  const { boardId } = params;
  const liveblocks = getLiveblocksClient();
  const boardInfo = await liveblocks.getRoom(boardId);
  const userEmail = await getUserEmail();
  if (!boardInfo.usersAccesses[userEmail]) {
    return <div>Access denied</div>;
  }
  return (
    <>
      <Header />
      <main className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <Link
            className="inline-flex gap-1 items-center btn mb-4 text-sm w-fit"
            href={`/boards/${boardId}`}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Go back to board
          </Link>
          <BoardDeleteButton boardId={boardId} />
        </div>

        <h1 className="text-xl md:text-2xl">
          Access to board {boardInfo.metadata.boardName}:
        </h1>
        <div className="mb-8">
          <EmailsAccessList
            boardId={boardId}
            usersAccesses={boardInfo.usersAccesses}
          />
        </div>
        <NewBoardAccess boardId={boardId} />
      </main>
    </>
  );
}
