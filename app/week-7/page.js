"use client";
import React, {useState} from 'react'; 
import ItemList from './item-list';
import NewItem from './new-item';
import itemsData from './items.json';
import MealIdeas from './meal-ideas';

const Page = () => { 

    const [items, setItems] = useState(itemsData)
    const [selectedItemName, setSelectItemName] = useState('');

    const handleAddItem = (newItem) => {
        setItems([...items, newItem])
    }

    const handleItemSelect = (itemName) => {
        setSelectItemName(itemName)
    }

    return (
        <main className="bg-slate-950 m-4">
          <h1 className="text-3xl font-bold m-2">Shopping List</h1>
          <NewItem onAddItem={handleAddItem} />
          <div className="flex">
            <div className="w-1/2">
              <ItemList items={items} onItemSelect={handleItemSelect} />
            </div>
            {selectedItemName && (
              <div className="w-1/2">
                <div className="mt-4">
                  <h2 className="text-2xl font-bold">Meal Ideas for {selectedItemName}</h2>
                  <MealIdeas ingredient={selectedItemName} />
                </div>
              </div>
            )}
          </div>
        </main>
      );
 };

export default Page;