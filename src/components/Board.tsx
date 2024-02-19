// Board.jsx

import React from 'react';
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";

const columns = [
    { id: 'Aditya', name: 'todo', index: 0 },
    { id: 'Anurag', name: 'in progress', index: 1 },
    { id: 'Chota bheem', name: 'done', index: 2 },
];

const cards = [
    { id: "Aditya", name: "Task 1", order: 0 },
    { id: "Anjali", name: "Task 2", order: 1 },
    { id: "Anurag", name: "Task 3", order: 2 },
    { id: "Rashi", name: "Task 4", order: 3 },
];

export default function Board() {
    return (
        <>
            <div className="flex gap-4">
                {columns.map(column => (
                    <Column key={column.index} name={column.name} cards={cards} />
                ))}
                <NewColumnForm />
            </div>
        </>
    )
}
