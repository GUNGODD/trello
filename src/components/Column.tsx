type ColumnProps = {
    key: number,
    name: String,

}; // do not make any typos 

const cards = [
    { id: "Aditya", name: "Task 1", order: 0 },
    { id: "Anjali", name: "Task 2", order: 1 },
    { id: "Anurag ", name: "Task 3", order: 2 },
    { id: "Rashi", name: "Task 4", order: 3 },
]




export default function Column({ key, name }: ColumnProps) {
    return (
        <>
            <div key={key} className="w-36 bg-white shadow-sm rounded-md p-2">
                {name}
            </div>

        </>
    );
}