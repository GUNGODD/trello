
import Board from "@/components/Board";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default function Home() {
  const session  = await getServerSession()
  return (
    <>
      <Board />
    </>
  );
}
