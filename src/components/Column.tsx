
type ColumnProps = {
    key: number,
    name: String;
    cards:CardType [];

    
}; // do not make any typos 





export default function Column({ key, name, cards }: ColumnProps) {
    return (
        <div key={key} className="w-48 bg-white shadow-sm rounded-md p-2">
            <h3>{name}</h3>
            {cards.map(card => (
                <div key={card.order} className="border my-2 p-4 rounded-md">
                    <span>{card.name}</span>
                </div>
            ))}
        </div>
    );
}