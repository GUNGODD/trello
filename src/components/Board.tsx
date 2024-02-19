import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";

const columns  = [

    {id: 'Aditya', name: 'todo', index:0},
    {id: 'Anurag', name: 'in progress', index:1},
    {id: 'Chota bheem', name: 'done', index:2},
];

export default  function Board(){
    return (
        <>

        <div className="flex  gap-4">
            {columns.map(column =>(
        
              <Column key={column.index} name={column.name} />
            ))}
        </div>
       <NewColumnForm/>
        </>
    )
}