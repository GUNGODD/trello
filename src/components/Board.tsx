
/* eslint-disable react/jsx-key */
// Board.jsx
"use client";
import React from 'react';
import Column from './Column';
import NewColumnForm from "./forms/NewColumnForm";
import  {useState} from "react";

const defaultColumns = [
    { id: 'Aditya', name: 'todo', index: 0 },
    { id: 'Anurag', name: 'in progress', index: 1 },
    { id: 'Chota bheem', name: 'done', index: 2 },
    
];


export type CardType = {
   
        name: string;
        id:string | number;
        order:number;
        columnId:string;
        index: number;
  
}
export const defaultCards = [
    { id: "Aditya", name: "Task 1", index: 0, columnId: 'Aditya' },
    { id: "Ashly", name: "Task 6", index: 0, columnId: 'Ashly' },
    { id: "Anjali", name: "Task 2", index: 2, columnId: 'Anjali' },
    { id: "Anurag", name: "Task 3", index: 3, columnId: 'Anurag' },

];


export default function Board() {

    const [cards, setCards] = useState(defaultCards);
    const [columns, SetColumns] = useState(defaultColumns);
    return (
        <>
            <div  className="flex gap-4">
                {columns.map(column => (
      
                      <Column       {...column}
                     setCards={setCards}
                       cards={cards.sort((a,b) =>a.index - b.index)
                        .filter(c =>c.columnId === column.id)} />
      
                ))}
                <NewColumnForm />
            </div>
        </>
    )
}
