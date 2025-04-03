// Droppable.jsx
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    position: 'relative',
    border: isOver ? '2px dashed green' : '2px solid transparent',
    width: '374px', // Adjust the mannequin size as needed
    height: '666px', // Adjust the mannequin size as needed
    background: '/url(closet/mannequin-display.jpg)', // Mannequin image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}