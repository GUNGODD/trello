"use client"
import Link from "next/link"
import { FormEvent } from "react";

export  default  function NewColumnForm(){
    function handleNewColumn(ev: FormEvent) {
        ev.preventDefault();
   
        const formData = (ev.target as HTMLFormElement).querySelector('input');
          const columnName = formData?.value;
          alert("new column :" + columnName);
        
        
        
    }
    
    return (
<form onSubmit={handleNewColumn} className="max-w-xs ml-[60%] shrink-0 shadow-lg rounded-xl">
    <label className="block">
        <span className="text-gray-600 block">Column name:</span>
        <input type="text" placeholder="new column name" />
    </label>
    <button type="submit" className=" text-gray-600  rounded-md  mt-2 block w-full">Create new Column</button>
</form>

    )
}