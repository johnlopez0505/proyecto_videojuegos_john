
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


const VideoJuego = ({game,handleDelete}) => {
  
  const {categorias,plataforma} = useAuth();


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


    return(
        <div className="containerCard">
            <div className="img" key={game.id}>
                  <p>{game.title}</p>
                  <img src={game.image} alt="img" />
                  <p>{game.date}</p>
                  <div className='description' key={game.id}>
                      <p>{game.description  != undefined? game.description.slice(0, 100):"no tiene descripcion"}...</p>
                  </div>
                  <h4><Link to={"/game/" + game.id}>Mostrar detalles</Link></h4>
                  <p>Precio ${game.precio}€</p>
                  <p>La categoría es: {getCategoryNames(game).join(', ')}</p>
                  <p>La Plataforma es: {getPlataformaName(game).join(', ')}</p>
                  {/* <p><a href="#openModal" onClick={handleClick}>Detalle Modal</a></p> */}
                  <button type='button' onClick={() => handleDelete(game.id)} className='button'>Borrar</button>
                  {/* <Modal game={game} categorias={categorias} plataforma={plataforma}/> */}
              </div>
        </div>
    )
}

export default VideoJuego;