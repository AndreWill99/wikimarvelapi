// src/components/CharacterCard/index.jsx
import React from 'react';
import './style_card.css'; // O CSS que define o card com bordas arredondadas


const CharacterCard = ({ name, image }) => {
  const imageUrl = image.url.replace("http://", "https://");
  return (
    <div className="character-card">
      <div className="image-container">
        <img src={imageUrl} alt={name} className="character-image" referrerPolicy="no-referrer" />
      </div>
      <p className="character-name">{name}</p>
    </div>
  );
};

export default CharacterCard;