
import Board from "@/components/Board";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { faArrowRightArrowLeft, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
    if (!session) {
      return (
          <LoginView />
      );
    }
  return (
    <>
    <div>
    <h1 className="text-4xl mb-4">Your Borads</h1>
  


{/* <Board /> */}

<div>
<Link  className="btn primary inline-flex gap-1 "
href={'/new-board'}>
  Create new Board  <FontAwesomeIcon className="h-6" icon={faRightLong} />
  </Link>

</div>


    </div>
    </>
  );
}
