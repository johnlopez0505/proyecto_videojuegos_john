import React, { useState } from 'react';
import API from '../axios';

import './AddGameForm.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const AddGameForm = () => {
    const [gameData, setgameData] = useState({
        title: '',
        date: '',
        plataforma: "",
        categoria: "",
        image: '',
        precio: '',
        description: '',
       
    });
    const navigate = useNavigate();
    const { state ,categorias, plataforma} = useAuth();
    const userId = state.user?.id;


    const handleChange = (e) => {
        setgameData({ ...gameData, [e.target.name]: e.target.name === 'categoria' 
            || e.target.name === 'plataforma'? Array.from(e.target.value) : e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/videojuegos', { ...gameData, userId }); 
            navigate('/videojuegos');
        } catch (error) {
            console.error("Error al añadir el video juego", error);
        }
    };

    return (
        <div className="containerForm">
            <h3>Añadir un nuevo video juego</h3>
            <form onSubmit={handleSubmit} className="form-container">
                <input name="title" value={gameData.title} onChange={handleChange} placeholder="Título" required />
                <input name="date" type='date' value={gameData.date} onChange={handleChange} placeholder="Fecha" required />
                <label for="categorial">categoria:</label>
                <select id="categoria" name="categoria" value={gameData.categoria}  onChange={handleChange}>
                    <option></option>
                    {categorias.map((categoria) =>        
                        <option key={categoria.id} value={categoria.id}>
                        {categoria.name}
                        </option>)
                    }
                </select>

                <label for="plataforma">plataforma:</label>
                <select id="plataforma" name="plataforma" value={gameData.plataforma}  onChange={handleChange} >
                    <option></option>
                    {plataforma.map((plataforma) =>        
                        <option key={plataforma.id} value={plataforma.id} >
                        {plataforma.name}
                        </option>)
                    }
                </select>
                <input name="precio" type='namber' value={gameData.precio} onChange={handleChange} placeholder="Precio" required />
                <input name="image"  value={gameData.numeroPortatiles} onChange={handleChange} placeholder=" Url de la Imagen" required />
                <textarea name="description" value={gameData.description} onChange={handleChange} placeholder="Descripción" required />
                <button type="submit">Añadir Video juego</button>
            </form>
        </div>
    );
};

export default AddGameForm;
