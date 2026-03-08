// src/components/CharacterDetails/Sidebar.jsx
import React from 'react';
import './details.css';

export const CharacterSidebar = ({ hero }) => {
    // Pegando aliases se existirem
    const aliases = hero.biography.aliases && hero.biography.aliases[0] !== '-'
        ? hero.biography.aliases.join(', ')
        : hero.biography['full-name'];

    return (
        <aside className="sidebar">
            <div className="detail-image-wrapper">
                <img src={hero.image.url} alt={hero.name} />
            </div>

            <div className="info-section">
                <h3 className="section-title">Fatos do Herói</h3>
                <div className="info-block">
                    <span className="info-label">Poderes:</span>
                    <p className="info-text">
                        Inteligência ({hero.powerstats.intelligence}),
                        Força ({hero.powerstats.strength}),
                        Velocidade ({hero.powerstats.speed}),
                        Durabilidade ({hero.powerstats.durability}),
                        Poder ({hero.powerstats.power}),
                        Combate ({hero.powerstats.combat})
                    </p>
                </div>

                <div className="info-block">
                    <span className="info-label bold-label">Primeira Aparição:</span>
                    <p className="info-text">{hero.biography['first-appearance']}</p>

                    <span className="info-label">Alias/Alter Ego:</span>
                    <p className="info-text">{aliases}</p>

                    <span className="info-label">Editora:</span>
                    <p className="info-text">{hero.biography.publisher}</p>

                    <span className="info-label">Raça:</span>
                    <p className="info-text">{hero.appearance.race}</p>

                    <span className="info-label">Gênero:</span>
                    <p className="info-text">{hero.appearance.gender}</p>

                    <span className="info-label">Altura:</span>
                    <p className="info-text">{hero.appearance.height}</p>

                    <span className="info-label">Peso:</span>
                    <p className="info-text">{hero.appearance.weight}</p>

                    <span className="info-label">Local de Nascimento:</span>
                    <p className="info-text">{hero.biography['place-of-birth']}</p>

                    <span className="info-label">Primeira Aparição:</span>
                    <p className="info-text">{hero.biography['first-appearance']}</p>
                </div>

                <div className="info-block">
                    <span className="info-label bold-label">Ocupação:</span>
                    <p className="info-text">{hero.work.occupation !== '-' ? hero.work.occupation : 'Unknown'}</p>
                </div>
            </div>
        </aside>
    );
};