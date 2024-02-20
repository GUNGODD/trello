"use client"
import { useState } from "react";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";




const defaultColumns  = [

    {id: 'sxsd', name: 'todo', index:0},
    {id: 'ppdf', name: 'in progress', index:1},
    {id: 'kdxk', name: 'done', index:2},
];

export type  CardType = {

id:string,
name:string | number,
order:number,
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
           setCards ={setCards}
           cards ={cards.filter(c => c.columnId === column.id)} />
             
            ))}
        </div>
       <NewColumnForm/>
        </>
    )
}




