"use client";
import React, {createContext, Dispatch, useState} from "react";

export type OpenCardId = string|null;
export type BoardContextProps = {
  openCard?: OpenCardId;
  setOpenCard?: Dispatch<React.SetStateAction<OpenCardId>>;
  showLabelNames?: boolean;
  setShowLabelNames?: Dispatch<React.SetStateAction<boolean>>;
};

type ProviderProps = {
  children: React.ReactNode,
};

export const BoardContext = createContext<BoardContextProps>({});

export function BoardContextProvider({children}:ProviderProps) {
  const [openCard, setOpenCard] = useState<OpenCardId>(null);
  const [showLabelNames, setShowLabelNames] = useState<boolean>(true);
  return (
    <BoardContext.Provider value={{
      openCard, setOpenCard,
      showLabelNames, setShowLabelNames,
    }}>
      {children}
    </BoardContext.Provider>
  );
}