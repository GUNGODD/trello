

/* eslint-disable react/jsx-key */
import { ItemInterface, ReactSortable } from "react-sortablejs";
import Board, { CardType } from "./Board";


type ColumnProps = {
    name: string;
    id:  string;
    cards: CardType[];
    setCards: (cards: CardType[]) => void;

}




export default function Column({id , name, cards, setCards }: ColumnProps) {
    // console.log({cards});
    // Card handling funciton 
    function setCardsForColumn(cards: CardType[], columnId:string) {
        console.log({cards, columnId});
      
    }


    return (

        <div className="w-48 shadow-md bg-white rounded-sm p-4">
            <h3>{name}</h3>
            <ReactSortable
                list={cards}
                setList={cards => setCardsForColumn(cards, id)}
                group="cards"
                >




                {cards.map(card => (
                    <div className="border my-2 p-4 rounded-md">
                        <span>{card.name}</span>
                    </div>
                ))}
            </ReactSortable>

        </div>

    );
}
