// App.jsx
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

function App() {
  const [outfit, setOutfit] = useState([]);
  const clothingItems = [
    { id: 'shirt1', label: 'Shirt 1', image: '/clothes-img/green-top.png' },
    { id: 'shirt2', label: 'Shirt 2', image: '/clothes-img/pink-check-top.png' },
    { id: 'shirt3', label: 'Shirt 3', image: '/clothes-img/pink-stripes-sweatertop.png' },
    { id: 'shirt4', label: 'Shirt 4', image: '/clothes-img/red-dress.png' },
    { id: 'pants1', label: 'Pants 1', image: '/clothes-img/blue-jeans.png' },
    { id: 'pants2', label: 'Pants 2', image: '/clothes-img/dark-jeans.png' },
    { id: 'skirt1', label: 'Skirt 1', image: '/clothes-img/basic-white-skirt.png' },
    { id: 'skirt2', label: 'Skirt 2', image: '/clothes-img/black-pleated-skirt.png' },
    { id: 'skirt3', label: 'Skirt 3', image: '/clothes-img/cherry-skirt.png' },
    { id: 'skirt4', label: 'Skirt 4', image: '/clothes-img/hot-pink-skirt.png' },
    { id: 'skirt5', label: 'Skirt 5', image: '/clothes-img/orange-skirt.png' },
    { id: 'skirt6', label: 'Skirt 6', image: '/clothes-img/purple-lacey-skirt.png' },
    { id: 'skirt7', label: 'Skirt 7', image: '/clothes-img/red-lacey-skirt.png' },
    { id: 'skirt8', label: 'Skirt 8', image: '/clothes-img/satin-pink-skirt.png' },
    { id: 'jacket1', label: 'Jacket 1', image: '/clothes-img/furr-coat-pink.png' },
    { id: 'jacket2', label: 'Jacket 2', image: '/clothes-img/pastel-yellow-cardigan.png' },
    { id: 'jacket3', label: 'Jacket 3', image: '/clothes-img/white-cardigan-bow.png' },
    { id: 'jacket4', label: 'Jacket 4', image: '/clothes-img/green-sweater.png' },
    { id: 'hat1', label: 'Hat 1', image: '/clothes-img/blue-hijab.png' },
    { id: 'hat2', label: 'Hat 2', image: '/clothes-img/purple-hijab.png' },
    { id: 'hat3', label: 'Hat 3', image: '/clothes-img/pink-hijab.png' },
    { id: 'hat4', label: 'Hat 4', image: '/clothes-img/pink-headphones.png' },
  ];

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id === 'mannequin') {
      setOutfit([...outfit, active.id]); // Add the item to the outfit
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        {clothingItems.map((item) => (
          <Draggable key={item.id} id={item.id} image={item.image} />
        ))}
      </div>

      <Droppable id="mannequin">
        {outfit.length === 0 ? (
          <p>Drag clothes onto the mannequin</p>
        ) : (
          <div style={{ position: 'relative', width: '200px', height: '400px' }}>
            {/* Render the clothes on the mannequin */}
            {outfit.map((itemId, index) => {
              const item = clothingItems.find((c) => c.id === itemId);
              return (
                <img
                  key={index}
                  src={item.image}
                  alt={itemId}
                  style={{
                    position: 'absolute',
                    top: `${index * 40}px`, // Adjust positioning logic
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    zIndex: index, // Stack items
                  }}
                />
              );
            })}
          </div>
        )}
      </Droppable>
    </DndContext>
  );
}

export default App;
