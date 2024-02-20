

/* eslint-disable react/jsx-key */
import { ItemInterface, ReactSortable } from "react-sortablejs";
import Board, { CardType } from "./Board";


type ColumnProps = {
    name: string;
    cards: CardType[];
    setCards: (cards: CardType[]) => void;

}




export default function Column({ name, cards, setCards }: ColumnProps) {
    console.log({cards});
    // Card handling funciton 

    
    return (

        <div className="w-48 shadow-md bg-white rounded-sm p-4">
            <h3>{name}</h3>
            <ReactSortable
                list={cards}
                setList={setCards}
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
