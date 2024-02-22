
import Board from "@/components/Board";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default async function Home() {
  const session = await getServerSession(authOptions);
    if (!session) {
      return (
          <LoginView />
      );
    }
  return (
    <>
      <Board />
     
    </>
  );
}
