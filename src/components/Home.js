import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import './Home.css';

function Home() {
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault(); // Evita que Link redireccione, lo hará la protección de ruta.
    logout();
  };

  return (
    <div className="home">
      <header>
        <h1>Video juegos</h1>
      </header>
      <aside className="sidebar">
          <nav className='menuNav'>
            <ul>
              <li><Link to="/videojuegos">Ver VideoJuegos</Link></li>
              <li><Link to="/nuevo" >Añadir Video Juego</Link></li>
              <li><Link to="/about">Acerca de</Link></li>
              <li><Link to="/" onClick={handleLogout}>Cerrar Sesión</Link></li>
            </ul>
          </nav>
        </aside>
      <div className="container">
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Home;