
import Board from "@/components/Board";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
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
<Link  className="btn primary inline-block"
href={'/new-board'}>
  Create new Board &rarr;
  </Link>

</div>


    </div>
    </>
  );
}
