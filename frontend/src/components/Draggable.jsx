// Draggable.jsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    cursor: 'move',
  } : {};

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, width: '100px', height: '100px' }}
      {...listeners}
      {...attributes}
    >
      <img src={props.image} alt={props.id} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
