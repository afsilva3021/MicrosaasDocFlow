// src/components/layout/Layout.jsx
import Header from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        {children} {/* Aqui o conteúdo das páginas será injetado */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;