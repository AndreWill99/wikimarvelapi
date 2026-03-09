import './searchbar_style.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const SearchBar = ({
    searchText, setSearchText, handleSearch,
    filter, setFilter, order, setOrder
}) => {

    return (
        <div className="search-area">
            {/* Search and Filters */}

            <div className="search-box">
                <FaSearch onClick={handleSearch} className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Pesquisar..."
                />
                {/*<button className="clear-button" onClick={() => setSearchText('')}>Limpar</button>*/}

                <div className="filter-group">
                    <select className="custom-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">Filtro: Todos</option>
                        <option value="Marvel Comics">Somente Marvel</option>
                        <option value="DC Comics">Somente DC</option>
                        <option value="human">Somente Humanos</option>
                    </select>
                    <span className="custom-caret">▾</span>
                </div>

                <div className="filter-group">
                    <select className="custom-select" value={order} onChange={(e) => setOrder(e.target.value)}>
                        <option value="A-Z">Ordenar: A-Z</option>
                        <option value="Z-A">Ordenar: Z-A</option>
                    </select>
                    <span className="custom-caret">▾</span>
                </div>
            </div>
        </div>

    );
};

export default SearchBar;