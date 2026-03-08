import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import CharacterCard from '../CharacterCard';
import './details.css';

export const CharacterMain = ({ hero }) => {
    const [relatives, setRelatives] = useState([]);
    const [loadingRels, setLoadingRels] = useState(false);

    useEffect(() => {
        const fetchRelatives = async () => {
            if (!hero || !hero.connections || hero.connections.relatives === '-') return;

            setLoadingRels(true);
            try {
                const relString = hero.connections.relatives;
                // Ex: "Lois Lane (wife), Thomas Wayne (father)" -> limpa pra "Lois Lane"
                const parsedRelations = relString.split(/[,;]/).map(s => {
                    const cleanName = s.replace(/\([^)]*\)/g, '').trim();
                    const relationMatch = s.match(/\(([^)]+)\)/);
                    const relation = relationMatch ? relationMatch[1] : '';
                    return { original: s.trim(), cleanName, relation };
                }).filter(r => r.cleanName.length > 0)
                    .slice(0, 6); // Limite de 6 requisições API

                // Busca por cada nome na API
                const results = await Promise.all(
                    parsedRelations.map(async (relativeInfo) => {
                        try {
                            const res = await api.get(`/search/${relativeInfo.cleanName}`);
                            if (res.data.response === 'success' && res.data.results && res.data.results.length > 0) {
                                return { ...relativeInfo, heroData: res.data.results[0] };
                            }
                        } catch (err) {
                            // Ignora o erro silenciosamente se a pessoa comum não for encontrada
                        }
                        return { ...relativeInfo, heroData: null };
                    })
                );

                // Deduping characters (if API matches same character multiple times)
                const uniqueRels = [];
                const seen = new Set();
                results.forEach(r => {
                    const identifier = r.heroData ? `id-${r.heroData.id}` : `name-${r.cleanName}`;
                    if (!seen.has(identifier)) {
                        seen.add(identifier);
                        uniqueRels.push(r);
                    }
                });

                setRelatives(uniqueRels);
            } catch (err) {
                console.error("Erro ao carregar conexões", err);
            } finally {
                setLoadingRels(false);
            }
        };

        fetchRelatives();
    }, [hero]);

    return (

        <section className="main-content-details">
            <div style={{ marginTop: '50px' }}>
                <a href='/' title="Voltar" className="back-button">← VOLTAR</a>
            </div>

            <h1 className="hero-name-title">{hero.name}</h1>

            <p className="biography-text">
                {hero.biography['full-name'] !== '-' ? `${hero.biography['full-name']} também conhecido como ${hero.biography.aliases.join(', ')}, ${hero.appearance.race == 'Human' ? 'humano' : 'humano '}, é um Herói que ` : ''}
                nasceu em {hero.biography['place-of-birth'] !== '-' ? hero.biography['place-of-birth'] : 'local desconhecido'}.
                Atua pelo alinhamento {hero.biography.alignment === 'good' ? 'heróico (bom)' : hero.biography.alignment === 'bad' ? 'vilanesco (mau)' : 'neutro'}.
                Apareceu pela primeira vez em {hero.biography['first-appearance']} pela editora {hero.biography.publisher}.
            </p>

            <h2 className="connections-title">CONEXÕES</h2>
            <div className="connections-grid">
                {loadingRels ? (
                    <p style={{ fontStyle: 'italic', color: '#888' }}>Buscando parentes no multiverso...</p>
                ) : relatives.length > 0 ? (
                    relatives.map((rel, index) => (
                        rel.heroData ? (
                            <Link key={`rel-hero-${rel.heroData.id}-${index}`} to={`/character/${rel.heroData.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <CharacterCard name={rel.heroData.name} image={rel.heroData.image.url} />
                            </Link>
                        ) : (
                            <div key={`rel-txt-${index}`} className="relative-badge">
                                <strong>{rel.cleanName}</strong>
                                {rel.relation && <span>({rel.relation})</span>}
                            </div>
                        )
                    ))
                ) : (
                    <p style={{ color: '#666' }}>Nenhuma conexão registrada na agência da API.</p>
                )}
            </div>


        </section>
    );
};