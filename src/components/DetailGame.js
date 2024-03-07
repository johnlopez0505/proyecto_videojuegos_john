import { Link, useParams } from "react-router-dom";
import '../components/DetailGame.css'
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";


const DetailGame = () => {
  const{categorias,plataforma,videoJuego}= useAuth();
  const[game, setGame]= useState({});
    
    const { id } = useParams();
    const juego = videoJuego.find((juego) => juego.id.toString() === id);  
    useEffect(()=>{
        setGame(juego);
    },[game])

    const getCategoryNames = (juego) => {
        return juego.categoria.map((categoriaId) => {
          const categoria = categorias.find((categoria) => categoria.id == categoriaId);
          return categoria ? categoria.name : "Categoría no encontrada";
        });
      };
  
      const getPlataformaName = (juego) => {
        return juego.plataforma.map((plataformaId) => {
          const plataformas = plataforma.find((plataforma) => plataforma.id == plataformaId);
          return plataformas? plataformas.name : "Plataforma no encontrada";
        });
      }

    return  <div className="containerDetail">
                <div className="imgDetail">
                    <p>{game.title}</p>
                    <img src={game.image} alt="img" />
                    <p>{juego.date}</p>
                    <div className='descriptionDetail'>
                        <p>{game.description}</p>
                    </div>
                    <p>Precio ${game.precio}€</p>
                    <p>La categoría es: {getCategoryNames(juego).join(', ')}</p>
                    <p>La plataforma es: {getPlataformaName(juego).join(', ')}</p>
                    <h4><Link to={"/videojuegos"}>Regresar</Link></h4>
                </div>
            </div>
}

export default DetailGame;