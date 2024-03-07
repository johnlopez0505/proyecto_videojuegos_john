import React, { useState } from 'react';
import API from '../axios';

import './AddGameForm.css';
import { useLocation, useNavigate } from 'react-router-dom';

const EditCartForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cart = location.state;

    const [gameData, setgameData] = useState(cart);

    const handleChange = (e) => {
        setgameData({ ...gameData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(gameData);
            await API.put('/videojuegos/' + gameData.id, gameData);
            navigate('/videojuegos');
        } catch (error) {
            console.error("Error al añadir el video juego", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input name="title" value={gameData.title} onChange={handleChange} placeholder="Título" required />
            <input name="date" type='date' value={gameData.date} onChange={handleChange} placeholder="Fecha" required />
            <input name="plataforma" value={gameData.plataforma} onChange={handleChange} placeholder="Categoria" required />
            <input name="categoria"  value={gameData.categoria} onChange={handleChange} placeholder="PLataforma" required />
            <input name="precio" type='namber' value={gameData.precio} onChange={handleChange} placeholder="Precio" required />
            <input name="imagen"  value={gameData.numeroPortatiles} onChange={handleChange} placeholder="Imagen" required />
            <textarea name="descripcion" value={gameData.descripcion} onChange={handleChange} placeholder="Descripción" required />
            <button type="submit">Añadir Video juego</button> <button type="submit">Añadir Carrito</button>
        </form>
    );
};

export default EditCartForm;
