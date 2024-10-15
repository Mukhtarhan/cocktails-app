import './App.css';
import Home from './pages/Home';
import Drinks from './pages/Drinks';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
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
        <Route path="/login" element={<Login />} /> {/* Add login route */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
