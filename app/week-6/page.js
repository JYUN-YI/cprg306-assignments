"use client";
import React, {useState} from 'react'; 
import ItemList from './item-list';
import NewItem from './new-item';
import itemsData from './items.json';

const Page = () => { 

    const [items, setItems] = useState(itemsData)

    const handleAddItem = (newItem) => {
        setItems([...items, newItem])
    }

    return ( 
    <main className="bg-slate-950 m-4"> 
    <h1 className="text-3xl font-bold m-2">Shopping List</h1> 
    <NewItem onAddItem={handleAddItem} />
    <ItemList items={items}/> 
    </main> 
    );
 };

export default Page;