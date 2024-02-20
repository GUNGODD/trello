

/* eslint-disable react/jsx-key */
import Board from "./Board";


type ColumnProps = {
    name: String;
}

const cards = [ 

    { id: "1", name: "Task 1", order: 1 },
    { id: "2", name: "Task 2", order: 2 },
    { id: "3", name: "Task 3", order: 3 },
    { id: "4", name: "Task 4", order: 4 },
    { id: "5", name: "Task 5", order: 5 },
    
];



export default  function  Column ({name}:ColumnProps){
    return (
    
     <div className="w-36 shadow-md bg-white rounded-sm p-2">
      <h3>{name}</h3> 
        {cards.map(card => (
            <div className="border my-2 p-2 rounded-md">
                <span>{card.name}</span>
            </div>
        ))}         

                </div>
 
    );
}
