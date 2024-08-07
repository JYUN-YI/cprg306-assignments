import React from 'react';

const Item = ({ name, quantity, category, onSelect }) => {
  const handleClick = () => {
    onSelect(name);  
  }

  return (
    <ul className="p-2 m-4 bg-slate-900 max-w-sm" onClick={handleClick}>
      <div className="text-x1 font-bold">{name}</div>
      <div className="text-sm">Buy {quantity} in {category}</div>
    </ul>
  );
}

export default Item;