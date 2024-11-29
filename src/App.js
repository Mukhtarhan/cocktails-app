import './App.css';
import Home from './pages/Home';
import Drinks from './pages/Drinks';
import ProductDetail from './pages/ProductDetail';
import LoginRegister from './pages/LoginRegister';
import Favourites from './pages/Favourites';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/drinks/:idDrink" element={<ProductDetail />} />
        <Route path="/login" element={<LoginRegister />} /> {/* Add login route */}
        <Route path="/favourites" element={<Favourites />} /> {/* Add login route */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
