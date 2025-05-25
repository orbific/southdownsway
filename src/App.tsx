import './App.css';
import Header from "./Header.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoriesPage from './StoriesPage.tsx';
import MapPage from './MapPage.tsx';
import CharactersPage from './CharactersPage.tsx';
import AboutPage from './AboutPage.tsx';

function App() {

    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<StoriesPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/characters" element={<CharactersPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </div>
        </Router>
    );

}

export default App;