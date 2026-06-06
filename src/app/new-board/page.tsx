import {createBoard} from "@/app/actions/boardActions";
import Header from "@/components/Header";
import {redirect} from "next/navigation";

export default function NewBoardPage() {
  return (
    <>
      <Header />
      <main className="p-4 md:p-8">
        <div className="max-w-md mx-auto">
          <NewBoardForm />
        </div>
      </main>
    </>
  );
}

async function NewBoardForm() {
  async function handleNewBoardSubmit(formData: FormData) {
    'use server';
    const boardName = formData.get('name')?.toString() || '';
    const roomInfo = await createBoard(boardName);
    if (roomInfo) {
      redirect(`/boards/${roomInfo.id}`);
    }
  }

  return (
    <form action={handleNewBoardSubmit} className="block">
      <h1 
        className="text-2xl font-semibold mb-6"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Create new board
      </h1>
      <div className="space-y-4">
        <div>
          <label 
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Board name
          </label>
          <input type="text" name="name" placeholder="Enter board name"/>
        </div>
        <button type="submit" className="w-full">Create board</button>
      </div>
    </form>
  );
}
