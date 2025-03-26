// Outfit.jsx
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

function Outfit() {
  const [outfit, setOutfit] = useState([]);
  const clothingItems = [
    { id: 'shirt', image: '/clothes-img/basic-white-skirt.png' },
    { id: 'skirt', image: '/clothes-img/satin-pink-skirt.png' },
    { id: 'jacket', image: '/clothes-img/pastel-yellow-cardigan.png' },
  ];

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id === 'mannequin') {
      setOutfit([...outfit, active.id]); // Add the item to the outfit
    }
  };

  return (
    <div>
      <h1>Dress-Up Game</h1>
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
            <div style={{ 
                position: 'relative', 
                width: '200px', 
                height: '400px',
                border: '2px solid black',  // Shorthand for border
                backgroundImage: 'url(/clothes-img/mannequin-display.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}>
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
    </div>
  );
}

export default Outfit;
