"use client"
import { useState } from "react";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";



export type  CardType = {
    
    id:string | number;
    name: string;
    index: number;
}
const defaultColumns  = [

    {id: 'sxsd', name: 'todo', index:0},
    {id: 'ppdf', name: 'in progress', index:1},
    {id: 'kdxk', name: 'done', index:2},
];

export const CardType = {

id:String,
name:String,
order:Number,
};

 const defaultCards = [ 

    { id: "1", name: "Task 1", order: 1, columnId:"sxsd" },
    { id: "2", name: "Task 2", order: 2, columnId:"ppdf" },
    { id: "3", name: "Task 3", order: 3, columnId:"sxsd" },
    { id: "4", name: "Task 4", order: 4, columnId:"kdxd" },
    { id: "5", name: "Task 5", order: 5, columnId: "kdxk"},
    
];

export default  function Board(){
    const [cards, setCards] = useState(defaultCards);
    const [columns, setColumns] = useState(defaultColumns);
    return (
        <>

        <div className="flex  gap-4">
            {columns.map(column =>(
                // eslint-disable-next-line react/jsx-key
           <Column {...column} 
           cards ={cards.filter(c => c.columnId === column.id)} />
             
            ))}
        </div>
       <NewColumnForm/>
        </>
    )
}




