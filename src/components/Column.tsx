import React, { SetStateAction } from "react";
import { CardType } from "@/components/Board";
import { ReactSortable } from "react-sortablejs";

type ColumnProps = {
    id: string;
    name: string;
    cards: CardType[];
    setCards: SetStateAction<any>;
};

export default function Column({ id, name, cards, setCards }: ColumnProps) {
    function setCardsForColumn(sortedCards: CardType[], newColumnId: string) {
        console.log({ sortedCards, newColumnId }); // Corrected variable name


        const sortedCardsId = sortedCards.map(c => c.id);


        // Setting the state with the updated cards
        setCards((prevCards: CardType[]) => {
            const newCards = [...prevCards];
            newCards.forEach(newCards => {
                if (sortedCardsId.includes(newCards.id)) {
                    newCards.columnId = newColumnId;
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
