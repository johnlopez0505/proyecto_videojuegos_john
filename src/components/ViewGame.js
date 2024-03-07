import React, { useEffect } from 'react';
import API from '../axios';
import './ViewGame.css';
import VideoJuego from './VideoJuego';
import { useAuth } from '../context/AuthProvider';

const ViewGame = () => {

    const { videoJuego,search, setJuego , setVideoJuegosSeleccionados} = useAuth();

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await API.get('/videojuegos');
                setJuego(response.data);
                setVideoJuegosSeleccionados(response.data);
            } catch (error) {
                console.error("Error al obtener los videojuegos", error);
            }
        };
        fetchGames();
    }, []);


    const handleDelete = async (gameId) => {
        try {
            await API.delete(`/videojuegos/${gameId}`);
            const updatedGames = videoJuego.filter(game => game.id !== gameId);
            setJuego(updatedGames);
        } catch (error) {
            console.error("Error al borrar el videojuego", error);
        }
    };

   

    const results = !search ? videoJuego : (videoJuego.filter((dato)=> 
        dato.title.toLowerCase().includes(search.toLocaleLowerCase()) ||
        dato.description.toLowerCase().includes(search.toLocaleLowerCase())));
            
    
    return (
        
        <div className='containerGame'> 
        
                {
                    results.length === 0 || videoJuego.length === 0 ? <div style={{margin:'auto'}}>
                        <p>No se han encontrado video juegos</p>
                    </div> :
                    results.map(videojuego =>
                        <>
                            <VideoJuego key={videojuego.id} game={videojuego} handleDelete={handleDelete}/>
                        </>
                    )
                }
            </div>
    );
};

export default ViewGame;
