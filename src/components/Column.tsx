

/* eslint-disable react/jsx-key */
import { ItemInterface, ReactSortable } from "react-sortablejs";
import Board, { CardType } from "./Board";
import { SetStateAction } from "react";
import { log } from "console";


type ColumnProps = {
    id:  string;
    name: string;
    cards: CardType[];
    setCards: SetStateAction<any>;

}




export default function Column({id , name, cards, setCards }: ColumnProps) {
    // console.log({cards});
    // Card handling funciton 
    function setCardsForColumn(sortedCards: CardType[], NewColumnId:string) {
        console.log({sortedCards, NewColumnId});
        const sortedCardsIds = sortedCards.map(card => card.id);

        // changing columns 
        setCards((prevCards:CardType[]) =>{
            const newCard = [...prevCards];
           sortedCards.forEach((c:CardType, newIndex:number)=>{
            const foundCard = newCard.find(newCard => newCard.id === c.id);
            if ( foundCard) {
                foundCard.index  = newIndex;;
            }
           })
            return newCard;
        });
      
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
