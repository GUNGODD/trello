
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";



export type  CardType = {
    
    id:string | number;
    name: string;
    index: number;
}
const columns  = [

    {id: 'sxsd', name: 'todo', index:0},
    {id: 'ppdf', name: 'in progress', index:1},
    {id: 'kdxk', name: 'done', index:2},
];

export const CardType = {

id:String,
name:String,
order:Number,
};

 const cards = [ 

    { id: "1", name: "Task 1", order: 1 },
    { id: "2", name: "Task 2", order: 2 },
    { id: "3", name: "Task 3", order: 3 },
    { id: "4", name: "Task 4", order: 4 },
    { id: "5", name: "Task 5", order: 5 },
    
];

export default  function Board(){
    return (
        <>

        <div className="flex  gap-4">
            {columns.map(column =>(
                // eslint-disable-next-line react/jsx-key
           <Column {...column} cards={cards} />
             
            ))}
        </div>
       <NewColumnForm/>
        </>
    )
}




