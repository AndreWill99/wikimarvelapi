// src/components/CharacterCard/index.jsx
import React from 'react';
import './style_card.css';


const CharacterCard = ({ name, image }) => {
  const incomingUrl = typeof image === 'string' ? image : image?.url;
  let imageUrl = "";
  if (incomingUrl) {
    const rawUrl = incomingUrl.replace(/^http:\/\//i, "https://");
    imageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(rawUrl)}`;
  }

  return (
    <div className="character-card">
      <div className="image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="character-image" crossOrigin="anonymous"
            referrerPolicy="no-referrer" />
        ) : (
          <div className="character-image" style={{ backgroundColor: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem' }}>Sem Foto</div>
        )}
      </div>
      <p className="character-name">{name}</p>
    </div>
  );
};

export default CharacterCard;