import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Modelos from './pages/Modelos';
import Documentos from './pages/Documentos';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para home page */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />

        {/* Rota para Pagina modelos */}
        <Route path="/documentos" element={
          <Layout>
            <Documentos />
          </Layout>
        } />

          {/* Rota para Pagina Docuemtos */}
        <Route path="/modelos" element={
          <Layout>
            <Modelos />
          </Layout>
        } />

        {/* Rota para pagina de Cadastro */}
        <Route path="/login" element={
            <Login />
        } />

        {/* Rota para Cadastro */}
        <Route path="/cadastro" element={
          <Cadastro />
        } />
        
      </Routes>
    </Router>
  );
}

export default App;
