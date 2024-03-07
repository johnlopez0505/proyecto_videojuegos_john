
import { useEffect } from 'react';
import '../components/CheckBox.css';
import SearchComponent from '../components/SearchComponent';
import { useAuth } from '../context/AuthProvider';
const CheckBox = () => {
    
   const {categorias,plataforma,categoriasSeleccionadas,
    plataformasSeleccionadas,videoJuegoSeleccionados,setCategoriasSeleccionadas
    ,setPlataformasSeleccionadas,setJuego} = useAuth();

   useEffect(()=>{
        filtrarVideoJuegos();
   },[categoriasSeleccionadas,plataformasSeleccionadas])


    const handleCheckboxChange = (event) => {
        const selectedId = parseInt(event.target.value);
        if (!event.target.checked) {
            setCategoriasSeleccionadas([...categoriasSeleccionadas,selectedId]);
        } 
        else {
            console.log(event.target.checked);
            const updatedCategorias = categoriasSeleccionadas.filter(
              selectedCategoria => selectedCategoria !== selectedId
            );
            setCategoriasSeleccionadas(updatedCategorias);
        };
   
    }
    

    const handleCheckboxChangePlataforma = (event) =>{
        const selectedId = parseInt(event.target.value);
        if(!event.target.checked) {
            setPlataformasSeleccionadas([...plataformasSeleccionadas, selectedId]);
        }
        else{
            const updatedPlataformas = plataformasSeleccionadas.filter(
                selectedPLataforma => selectedPLataforma !== selectedId
            );
            setPlataformasSeleccionadas(updatedPlataformas);
            
        }
       
    };

    const filtrarVideoJuegos = () => {
        const videojuegosFiltrados = videoJuegoSeleccionados.filter(juego => 
            !juego.categoria.every(categoria => categoriasSeleccionadas.includes(categoria)
            && juego.plataforma.every(plataforma => plataformasSeleccionadas.includes(plataforma)))
        );
        setJuego(videojuegosFiltrados);
    }


    return ( <div className="checkBox">
                <p>Categorias</p>
                <nav className="menucheck_box">
                    {
                        categorias.map(categoria =>
                            <div className="menu" key={categoria.id}> 
                                <label htmlFor={`categoria_${categoria.id}`}>{categoria.name}</label>
                                <input  type={"checkbox"} 
                                        id={`categoria_${categoria.id}`}
                                        value={categoria.id}
                                        onChange={handleCheckboxChange} 
                                        defaultChecked/> 
                            </div>
                        )
                    }
                    
                    
                </nav>
                <p>PLataformas</p>
                <nav className="menucheck_box1">
                    {
                        plataforma.map(plataforma =>
                            <div className="menu" key={plataforma.id}> 
                                <label htmlFor="plataformas">{plataforma.name}</label>
                                <input  type={"checkbox"} 
                                        id={"plataformas"}
                                        value={plataforma.id}
                                        onChange={handleCheckboxChangePlataforma} 
                                        defaultChecked /> 
                            </div>
                        )
                    }
                    
                </nav>
                <SearchComponent/>
            </div>
        )
}

export default CheckBox;