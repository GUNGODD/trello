"use client";

import { redirect } from "next/dist/server/api-utils";
import createBoard from "../actions/boardActions";

export default function NewBoardPage(){
   async  function handleNewBoardSubmit(formData: FormData) {
const boardName = formData.get('name')?.toString() || '';

// or 
// await createBoard(boardName as string); 
     const {id} =   await createBoard(boardName);
     redirect(`/boards/${id}`);
    }
    
    return (
       <div>
        <form action={handleNewBoardSubmit} className="mx-w-xs block">
            <h1 className="text-2xl mb-4">Create new boards</h1>
            <input type="text" placeholder="board name  " />
            <button className="mt-2 w-full" type="submit">Create board</button>
        </form>


       </div>
    );
}

