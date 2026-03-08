import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api'; // Sua config do axios
import { CharacterSidebar } from '../components/CharacterDetails/Sidebar';
import { CharacterMain } from '../components/CharacterDetails/MainContent';
import './CharacterPage.css';
import { Navbar } from '../components/header/navbar';

const CharacterPage = () => {
    const { id } = useParams(); // Pega o ID da URL
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHeroDetails() {
            try {
                // A SuperHero API permite buscar direto pelo ID: /id
                const response = await api.get(`/${id}`);
                setHero(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchHeroDetails();
    }, [id]);

    if (loading) return <div className="loading">Carregando herói...</div>;
    if (!hero) return <div className="error">Herói não encontrado.</div>;

    return (
        <>
            <Navbar />
            <div className="details-page-wrapper">
                <div className="details-container">
                    <CharacterSidebar hero={hero} />
                    <CharacterMain hero={hero} />
                </div>
            </div>
        </>
    );
};

export default CharacterPage;