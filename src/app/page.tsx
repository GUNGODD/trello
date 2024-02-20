
import Board from "@/components/Board";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default async function Home() {
  const session  = await getServerSession(authOptions)
  return (
    <>
      <Board />
    </>
  );
}
