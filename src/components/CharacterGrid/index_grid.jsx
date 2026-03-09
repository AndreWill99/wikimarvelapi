import React from 'react';
import { Link } from 'react-router-dom';
import CharacterCard from '../CharacterCard';
import './style_grid.css';

const CharacterGrid = ({ characters, loading }) => {
    if (loading) {
        return (
            <div className="grid-status">
                <p>Buscando heróis no multiverso...</p>
            </div>
        );
    }

    if (characters.length === 0) {
        return (
            <div className="grid-status">
                <p>Nenhum personagem encontrado. Tente outra busca!</p>
            </div>
        );
    }

    return (
        <div className="character-grid">
            {characters.map((hero) => (
                <Link key={hero.id} to={`/character/${hero.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CharacterCard
                        name={hero.name}
                        image={hero.image}
                    />
                </Link>
            ))}
        </div>
    );
};

export default CharacterGrid;