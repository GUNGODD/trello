"use client";

import { Room } from "@/app/Room";
import { BoardContextProvider } from "@/components/BoardContext";
import { useParams } from "next/navigation";
import React from "react";

type PageProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function BoardLayout({ children, modal }: PageProps) {
  const params = useParams();
  return (
    <BoardContextProvider>
      <Room roomId={params.boardId.toString()}>
        {children}
        {modal}
      </Room>
    </BoardContextProvider>
  );
}
