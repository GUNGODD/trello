// Board.jsx
"use client";
import React from 'react';
import Column from './Columns';
import NewColumnForm from "./forms/NewColumnForm";

const columns = [
    { id: 'Aditya', name: 'todo', index: 0 },
    { id: 'Anurag', name: 'in progress', index: 1 },
    { id: 'Chota bheem', name: 'done', index: 2 },
    
];


export type CardType = {
   
        name: String;
        id:String;
        order:Number;
  
}
export const cards = [
    { id: "Aditya", name: "Task 1", order: 0, columnId: 'Aditya' },
    { id: "Anjali", name: "Task 2", order: 1, columnId: 'Anurag' },
    { id: "Anurag", name: "Task 3", order: 2, columnId: 'Chota bheem' },

];

export default function Board() {
    return (
        <>
            <div className="flex gap-4">
                {columns.map(column => (
        <div className="w-48 bg-white shadow-sm rounded-md p-2">
                      <Column  name={...Column} cards={cards.filter(c =>c.columnId === column.id)} />
        </div>
                ))}
                <NewColumnForm />
            </div>
        </>
    )
}
