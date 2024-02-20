
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

export default  function Board(){
    return (
        <>

        <div className="flex  gap-4">
            {columns.map(column =>(
                // eslint-disable-next-line react/jsx-key
           <Column {...column}/>
             
            ))}
        </div>
       <NewColumnForm/>
        </>
    )
}




