import React from 'react';

export default function Rating(props) {
  return (
    <div className="rating">
      <span className={props.value >= 1 ? 'active' : ''}>☆</span>
      <span className={props.value >= 2 ? 'active' : ''}>☆</span>
      <span className={props.value >= 3 ? 'active' : ''}>☆</span>
      <span className={props.value >= 4 ? 'active' : ''}>☆</span>
      <span className={props.value >= 5 ? 'active' : ''}>☆</span>
    </div>
  );
}
