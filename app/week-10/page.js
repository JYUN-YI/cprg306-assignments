"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from './_utils/auth-context';

const Page = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const goToShoppingList = () => {
    router.push('/week-10/shopping-list');
  };

  return (
    <div>
      {user ? (
        <div className="text-lg">
          <h1 className="text-4xl font-bold mb-5">Shopping List App</h1>
          <p>Signed in as {user.displayName} ({user.email}).</p>
          <p><button onClick={handleSignOut}>Sign out</button></p>
          <p><button onClick={goToShoppingList} className="text-lg hover:underline">Continue to your Shopping List</button></p>
        </div>
      ) : (
        <main>
          <h1 className="text-4xl font-bold mb-5">Shopping List App</h1>
          <div className="text-lg">
            <button onClick={handleSignIn}>Sign in with GitHub</button>
          </div>
        </main>
      )}
    </div>
  );
};

export default Page;
