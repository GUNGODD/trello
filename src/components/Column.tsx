import React, { SetStateAction } from "react";
import { CardType } from "@/components/Board";
import { ReactSortable } from "react-sortablejs";
import { log } from "console";

type ColumnProps = {
    id: string;
    name: string;
    cards: CardType[];
    setCards: SetStateAction<any>;
};

export default function Column({ id, name, cards, setCards }: ColumnProps) {
    function setCardsForColumn(sortedCards: CardType[], newColumnId: string) {
        setCards((prevCards: CardType[]) => {
            const newCards = [...prevCards];
            sortedCards.forEach((sortedCard: CardType, newIndex: number) => {
                const foundCardIndex = newCards.findIndex(card => card.id === sortedCard.id);
                if (foundCardIndex !== -1) {
                    const foundCard = newCards[foundCardIndex];
                    foundCard.index = newIndex;
                    foundCard.columnId = newColumnId;
                    newCards[foundCardIndex] = foundCard; // Update the card in the array
                }
            });
            return newCards;
        });
    }
    

    return (
        <div className="w-48 bg-white shadow-sm rounded-md p-2">
            <h3>{name}</h3>
            <ReactSortable
                list={cards}
                setList={sortedCards => setCardsForColumn(sortedCards, id)} // Corrected parameter name
                group="cards"
            >
                {cards.map(card => (
                    <div key={card.id} className="border my-2 p-4 rounded-md">
                        <span>{card.name}</span>
                    </div>
                ))}
            </ReactSortable>
        </div>
    );
}
