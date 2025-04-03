// Outfit.jsx
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from './Droppable';
import { Draggable } from './Draggable';

function Outfit() {
  const [outfit, setOutfit] = useState([]);
  const clothingItems = [
    { id: 'shirt1', label: 'Shirt 1', image: '/closet/green-top.png' },
    { id: 'shirt2', label: 'Shirt 2', image: '/closet/pink-check-top.png' },
    { id: 'shirt3', label: 'Shirt 3', image: '/closet/white-sweater.png' },
    { id: 'shirt4', label: 'Shirt 4', image: '/closet/red-dress.png' },
    { id: 'shirt5', label: 'Pants 1', image: '/closet/white-top2.png' },
    { id: 'pants1', label: 'Pants 2', image: '/closet/dark-jeans.png' },
    { id: 'skirt1', label: 'Skirt 1', image: '/closet/basic-white-skirt.png' },
    { id: 'skirt2', label: 'Skirt 2', image: '/closet/black-pleated-skirt.png' },
    { id: 'skirt3', label: 'Skirt 3', image: '/closet/cherry-skirt.png' },
    { id: 'skirt4', label: 'Skirt 4', image: '/closet/hot-pink-skirt.png' },
    { id: 'skirt5', label: 'Skirt 5', image: '/closet/satin-pink-skirt.png' },
    { id: 'skirt6', label: 'Skirt 6', image: '/closet/purple-lacey-skirt.png' },
    { id: 'skirt7', label: 'Skirt 7', image: '/closet/red-lacey-skirt.png' },
    { id: 'skirt8', label: 'Jacket 1', image: '/closet/pink-keffiyeh2.png' },
    { id: 'jacket1', label: 'Jacket 2', image: '/closet/furr-coat-pink.png' },
    { id: 'jacket2', label: 'Jacket 3', image: '/closet/strawberry-sweater.png' },
    { id: 'jacket3', label: 'Jacket 4', image: '/closet/white-cardigan-bow.png' },
    { id: 'jacket4', label: 'Jacket 5', image: '/closet/green-sweater.png' },
    { id: 'hat1', label: 'Hat 1', image: '/closet/blue-hijab.png' },
    { id: 'hat2', label: 'Hat 2', image: '/closet/purple-hijab.png' },
    { id: 'hat3', label: 'Hat 3', image: '/closet/watermelon-bucket-hat.png' },
    { id: 'hat4', label: 'Hat 4', image: '/closet/pink-headphones.png' },
  ];

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id === 'mannequin') {
      setOutfit([...outfit, active.id]); // Add the item to the outfit
    }
  };

  const handleReset = () => {
    setOutfit([]);
  };
  

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '36px',
          fontWeight: 'bold',
          padding: "5px 10px",
          marginBottom: '30px',
          borderRadius: "5px",
          color: '#FF8FAB',
          backgroundColor: "rgba(255, 215, 221, 0.5)",
          display: 'inline-block',
        }}>
          Try-On Clothes
        </h1>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          {clothingItems.map((item) => (
            <Draggable key={item.id} id={item.id} image={item.image} />
          ))}
        </div>
        <div style={{ marginBottom: '20px', }}>
          <button
           onClick={handleReset}
           style={{
            marginLeft: '100px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#7e895e',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
           }}>
          Reset Mannequin
          </button>
        </div>
        <Droppable id="mannequin">
  <div style={{ 
    position: 'relative', 
    width: '374px', 
    height: '666px',
    border: '2px solid black',
    backgroundImage: 'url(/closet/body.PNG)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
    {outfit.length === 0 && (
      <p style={{ 
        color: 'gray',
        textAlign: 'center',
        paddingTop: '40%',
        margin: 0
      }}>
        Drag clothes onto the mannequin
      </p>
    )}

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
            top: '0px',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: 'auto',
            height: 'auto',
            zIndex: index,
          }}
        />
      );
    })}
  </div>
</Droppable>

      </DndContext>
    </div>
  );
}

export default Outfit;
