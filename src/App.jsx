import React, { useState, useEffect } from 'react';
import { Navbar } from './components/header/navbar';
import api from './api';
import CharacterGrid from './components/CharacterGrid/index_grid';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';

function App() {

  const [searchText, setSearchText] = useState('');
  const [featuredChars, setFeaturedChars] = useState([]);
  const [gridChars, setGridChars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPublisher, setCurrentPublisher] = useState('All');

  // New States for SearchBar and Pagination
  const [filter, setFilter] = useState('All');
  const [order, setOrder] = useState('A-Z');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => {
    // Math.max avoids negative values on edge cases, though 4 is the fixed visible length.
    const maxIndex = Math.max(0, featuredChars.length - 4);
    if (currentSlideIndex >= maxIndex) {
      setCurrentSlideIndex(0);
    } else {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex <= 0) {
      setCurrentSlideIndex(Math.max(0, featuredChars.length - 4));
    } else {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Re-start pagination when searching or changing filters
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, currentPublisher, order, gridChars]);

  const handleSearch = async () => {
    if (!searchText) return;
    setLoading(true);
    try {
      const response = await api.get(`/search/${searchText}`);
      if (response.data.response === "success") {
        setGridChars(response.data.results);
      } else {
        setGridChars([]);
      }
    } catch (error) {
      console.error("Erro na busca", error);
    } finally {
      setLoading(false);
    }
  };

  // Load featured characters and initial grid on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        // Featured Characters (Carousel)
        const featuredIds = [456, 345, 659, 332, 333];
        const featuredRes = await Promise.all(featuredIds.map(id => api.get(`/${id}`)));
        setFeaturedChars(featuredRes.map(res => res.data));

        // Initial Grid Characters - Mixed Marvel and DC Legends
        const gridIds = [
          70, 149, 346, 644, 213, 620, 106, 107, 204, 332, // Classic
          720, 208, 659, 10, 14, 251, 68, 73, 165, 17,     // Big names
          273, 274, 275, 278, 298, 303, 309, 313, 315, 333, // X-Men, Avengers
          345, 370, 381, 403, 414, 423, 442, 461, 463, 480, // JL, Villains
          492, 502, 514, 522, 530, 561, 567, 579, 612, 630, // Random popularity
          655, 680, 687, 714, 731, 26, 60, 63, 157, 162
        ];
        const gridRes = await Promise.all(gridIds.map(id => api.get(`/${id}`)));
        setGridChars(gridRes.map(res => res.data));
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // --- DERIVED STATE CALCULATIONS ---
  const getFilteredAndSortedCharacters = () => {
    let result = [...gridChars];

    // Filter by Publisher (from the quick toggles)
    if (currentPublisher !== 'All') {
      result = result.filter(hero =>
        hero.biography && hero.biography.publisher &&
        hero.biography.publisher.includes(currentPublisher)
      );
    }

    // Filter by Dropdown Filter (All, Marvel, DC, Humano)
    if (filter === 'Marvel Comics') {
      result = result.filter(hero => hero.biography?.publisher?.includes('Marvel'));
    } else if (filter === 'DC Comics') {
      result = result.filter(hero => hero.biography?.publisher?.includes('DC'));
    } else if (filter === 'human') {
      result = result.filter(hero => hero.appearance?.race === 'Human');
    }

    // Sorting
    if (order === 'A-Z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'Z-A') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  };

  const processedCharacters = getFilteredAndSortedCharacters();

  // Pagination Logic
  const totalPages = Math.ceil(processedCharacters.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedCharacters.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app-container">
      <Navbar />

      <main className="content">
        {/* Character Section */}
        <section className="featured-section">
          <h2 className="section-title">PERSONAGENS:</h2>
          <div className="carousel-container" style={{ position: 'relative', width: '100%' }}>
            <button className="carousel-arrow" onClick={prevSlide}>&#8249;</button>
            <div className="carousel-track" style={{ width: '100%' }}>
              <div
                className="carousel-inner-track"
                style={{
                  transform: `translateX(-${currentSlideIndex * 260}px)`
                }}
              >
                {featuredChars.length > 0 ? (
                  featuredChars.map((hero, idx) => (
                    <div key={`char-${hero.id}-${idx}`} className="circle-avatar" style={{ position: 'relative' }}>
                      <img src={hero.image?.url} alt={hero.name} className="avatar-image" />
                      <Link to={`/character/${hero.id}`} className="avatar-link" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></Link>
                    </div>
                  ))
                ) : (
                  <p>Carregando destaques...</p>
                )}
              </div>
            </div>
            <button className="carousel-arrow" onClick={nextSlide}>&#8250;</button>
          </div>
        </section>

        <div className="section-divider"></div>

        {/* Editoras Section */}
        <section className="publisher-section">
          <h2 className="section-title">EDITORAS:</h2>
          <div className="publisher-row">
            <div className={`pub-card marvel ${currentPublisher === 'Marvel Comics' ? 'active' : ''}`}
              onClick={() => setCurrentPublisher('Marvel Comics')}>
              <span className="sr-only">MARVEL</span>
            </div>
            <div className={`pub-card dc ${currentPublisher === 'DC Comics' ? 'active' : ''}`}
              onClick={() => setCurrentPublisher('DC Comics')}>
              <span className="sr-only">DC</span>
            </div>
            <div className={`pub-card all ${currentPublisher === 'All' ? 'active' : ''}`}
              onClick={() => setCurrentPublisher('All')}>
              TODAS
            </div>
          </div>
        </section>

        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
          filter={filter}
          setFilter={setFilter}
          order={order}
          setOrder={setOrder}
        />

        <CharacterGrid
          characters={currentItems}
          loading={loading}
        />

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <span
                key={number}
                onClick={() => paginate(number)}
                className={`page-number ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </span>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;