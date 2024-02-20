

/* eslint-disable react/jsx-key */
import Board, { CardType } from "./Board";


type ColumnProps = {
    name: String;
    cards: CardType[];
   
}




export default  function  Column ({name, cards}:ColumnProps){
    return (
    
     <div className="w-48 shadow-md bg-white rounded-sm p-4">
      <h3>{name}</h3> 
        {cards.map(card => (
            <div className="border my-2 p-4 rounded-md">
                <span>{card.name}</span>
            </div>
        ))}         

                </div>
 
    );
}
