import React, { useState, useEffect } from 'react';

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);

  // Define function to fetch meal ideas from API
  const fetchMealIdeas = async (ingredient) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      
      // Check if meals array exists in the response data
      if (data.meals) {
        return data.meals; // Array of meals
      } else {
        return []; // Return empty array if no meals found
      }
    } catch (error) {
      console.error('Error fetching meal ideas:', error);
      return []; // Return empty array on error
    }
  };

  // Define function to load meal ideas based on ingredient prop
  const loadMealIdeas = async () => {
    const fetchedMeals = await fetchMealIdeas(ingredient);
    setMeals(fetchedMeals);
  };

  // Load meal ideas initially and whenever ingredient prop changes
  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  // Render method
  return (
    <div>
      <h2>Meal Ideas with {ingredient}</h2>
      <ul>
        {meals.map(meal => (
          <li key={meal.idMeal}>{meal.strMeal}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealIdeas;
