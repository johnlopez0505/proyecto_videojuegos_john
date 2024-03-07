import React, { useState, useEffect } from 'react';
import API from '../axios';
import './ViewGame.css';
import { useNavigate } from 'react-router-dom';
import VideoJuego from './VideoJuego';
import { useAuth } from '../context/AuthProvider';

const ViewGame = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

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
            const updatedGames = games.filter(game => game.id !== gameId);
            setJuego(updatedGames);
        } catch (error) {
            console.error("Error al borrar el videojuego", error);
        }
    };

   


    const handleEdit = (game) => {
        navigate('/editar', { state: game });
    }
    console.log(videoJuego);
    const results = !search ? videoJuego : videoJuego.filter((dato)=> dato.title.toLowerCase().includes(search.toLocaleLowerCase()));
    console.log(results);
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
