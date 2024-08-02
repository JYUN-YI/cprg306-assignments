"use client";
import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import { useUserAuth } from '../_utils/auth-context'; 
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';
import { getItems, addItem, deleteItem } from '../_services/shopping-list-service';

const Page = () => {
  const router = useRouter();
  const { user, firebaseSignOut } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectItemName] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    const loadItems = async () => {
      if (user) {
        try {
          const userItems = await getItems(user.uid);
          setItems(userItems);
        } catch (error) {
          console.error('Error loading items:', error);
        }
      }
    };

    loadItems();
  }, [user]);

  const handleAddItem = async (newItem) => {
    try {
      const newItemId = await addItem(user.uid, newItem);
      setItems([...items, { id: newItemId, ...newItem }]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(user.uid, itemId);
      setItems(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
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
          <ItemList items={items} onItemSelect={handleItemSelect} onItemDelete={handleDeleteItem} />
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
