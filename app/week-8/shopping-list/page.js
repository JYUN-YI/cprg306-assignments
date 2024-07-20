"use client";
import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/router';
import { useUserAuth } from '../../_utils/auth-context'; 
import ItemList from './item-list';
import NewItem from './new-item';
import itemsData from './items.json';
import MealIdeas from './meal-ideas';

const Page = () => {
  const router = useRouter();
  const { user, firebaseSignOut  } = useUserAuth();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectItemName] = useState('');


  useEffect(() => {
    // Redirect to the landing page if user is not logged in
    if (!user) {
      router.push('/'); // Replace '/' with your landing page URL
    }
  }, [user, router]);
  

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleItemSelect = (itemName) => {
    setSelectItemName(itemName);
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return null; 
  }

  return (
    <main className="bg-slate-950 m-4">
      <h1 className="text-3xl font-bold m-2">Shopping List</h1>
      <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
        Sign Out
      </button>
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
