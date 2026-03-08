import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterPage from './pages/CharacterPage';
import Home from './App';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/character/:id" element={<CharacterPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;