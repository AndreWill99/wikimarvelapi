// src/components/CharacterCard/index.jsx
import React from 'react';
import './style_card.css'; // O CSS que define o card com bordas arredondadas

const CharacterCard = ({ name, image }) => {
  return (
    <div className="character-card">
      <div className="image-container">
        <img src={image} alt={name} className="character-image" />
      </div>
      <p className="character-name">{name}</p>
    </div>
  );
};

export default CharacterCard;