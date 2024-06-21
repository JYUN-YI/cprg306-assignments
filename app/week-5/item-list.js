"use client"
import React, { useState } from 'react';  
import Item from "./item";
import Items from "./items";

const ItemList = () => {
    const [sortBy, setSortBy] = useState('name');
    const [groupedItems, setGroupedItems] = useState(null);
    const [showGrouped, setShowGrouped] = useState(false);
    const [activeButton, setActiveButton] = useState('');
  
    // Sort items based on sortBy state
    const sortedItems = Items.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    const groupByCategory = () => {
        const grouped = sortedItems.reduce((acc, item) => {
            const category = item.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {})
    
    //Sort each category's items alphabetically by name
    for (let category in grouped){
        grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    }


    //Sort categories alphabetically
    const sortedCategories = Object.keys(grouped).sort((a, b) => a.localeCompare(b));
    const sortedGroupedItems = sortedCategories.reduce((acc, category) => {
        acc[category] = grouped[category];
    return acc;
    }, {});

    setGroupedItems(sortedGroupedItems);
    setShowGrouped(true);
    setActiveButton('grouped');

    }

    const toggleView = () => {
        if (showGrouped) {
            setShowGrouped(false);
        }
        else {
            groupByCategory();
        }
    }
    
    return (
      <div>
        <label htmlFor ="sort">Sort by: </label>
          <button
            className={`p-1 m-2 w-28 ${sortBy === 'name' && activeButton === 'name' ? 'bg-orange-500 text-white' : 'bg-orange-700'}`}
            onClick={() => {
                setSortBy('name')
                setActiveButton('name')
                setShowGrouped(false)
        }}
          >
            Name
          </button>
          <button
            className={`p-1 m-2 w-28 ${sortBy === 'category' && activeButton === 'category' ? 'bg-orange-500 text-white' : 'bg-orange-700'}`}
            onClick={() => {
                setSortBy('category')
                setActiveButton('category')
                setShowGrouped(false)

            }}
          >
            Category
          </button>
          <button
            className={`p-1 m-2 w-28 ${activeButton === 'grouped' ? 'bg-orange-500 text-white' : 'bg-orange-700'}`}
            onClick={toggleView}
          >
            Grouped Category   
          </button>
        <div className="grid">
            {showGrouped && groupedItems ? (
                //Display grouped items
                Object.keys(groupedItems).map(category => (
                    <div key={category} className="mb-4">
                        <h2 className="text-lg font-bold capitalize">{category}</h2>
                        <div calssName='grid'>
                        {groupedItems[category].map(item => (
                            <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
                        ))}
                        </div>
                    </div>
                ))
            ) : (
          sortedItems.map(item => (
            <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
          ))
            )}
        </div>
      </div>
    );
  };
  
  export default ItemList;

