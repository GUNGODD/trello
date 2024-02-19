type ColumnProps = {
    key: number,
    name: String,

}

export default  function  Column ({key ,name}:ColumnProps){
    return (
        <>
     <div key={key} className="w-36 bg-white shadow-sm rounded-md p-2">
                    {name}
                </div>

        </>
    );
}