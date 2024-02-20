"use client"
import { useState } from "react";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";




const defaultColumns  = [

    {id: 'col1', name: 'todo', index:1},
    {id: 'col2', name: 'in progress', index:2},
    {id: 'col3', name: 'done', index:3},
];

export type  CardType = {

id:string,
name:string | number,
order:number,
};

 const defaultCards = [ 

    { id: "1", name: "Task 1", order: 1, columnId:"col1" },
    { id: "2", name: "Task 2", order: 2, columnId:"col1" },
    { id: "3", name: "Task 3", order: 3, columnId:"col2" },
    { id: "4", name: "Task 4", order: 4, columnId:"col3" },

    
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
           setCards ={setCards}
           cards ={cards.filter(c => c.columnId === column.id)} />
             
            ))}
        </div>
       <NewColumnForm/>
        </>
    )
}




