
 import Board from "@/components/Board";
import { CardType } from './Board';

 
 
 type ColumnProps = {
  
    name: String;
    cards:CardType[];
   

    
}; // do not make any typos 



export default function Column({ name, cards }: ColumnProps) {
    return (
        <div  className="w-48 bg-gray shadow-lg rounded-md p-2">
            <h3>{name}</h3>
            {cards.map(card => (
                // eslint-disable-next-line react/jsx-key
                <div  className="border my-2 p-4 rounded-md">
                    <span>{card.name}</span>
                </div>
            ))}
        </div>
    );
}