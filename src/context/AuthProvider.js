import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import API from '../axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, isAuthenticated: true, user: action.payload.user, token: action.payload.token, loginError: null };
        case 'LOGIN_FAILED':
            return { ...state, isAuthenticated: false, user: null, token: null, loginError: action.payload };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null, token: null, loginError: null };
        case 'REGISTER_SUCCESS':
            return { ...state, isAuthenticated: true, user: action.payload.user, token: action.payload.token, loginError: null };
        case 'REGISTER_FAILED':
            return { ...state, isAuthenticated: false, user: null, token: null, loginError: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        isAuthenticated: false,
        user: null,
        token: null,
        loginError: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
    const [loading, setLoading] = useState(true);
    const [videoJuego, setJuego]= useState([]);
    const [categorias, setCategorias] = useState([]);
    const [plataforma, setPlataforma] = useState([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
    const [plataformasSeleccionadas, setPlataformasSeleccionadas] = useState([]);
    const [videoJuegoSeleccionados,setVideoJuegosSeleccionados] = useState([]);
    const [ search, setSearch ] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password });
            console.log(response.data);
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user, accessToken } });
        } catch (error) {
            console.error("Error during login", error);
            dispatch({ type: 'LOGIN_FAILED', payload: error.response.data || 'Error al iniciar sesión' })
        }
    };

    const register = async (email, password, username) => {
        try {
            const response = await axios.post('http://localhost:3000/register', { email, password, username });
            const { accessToken, user } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({ type: 'REGISTER_SUCCESS', payload: { user, accessToken } });
        } catch (error) {
            dispatch({ type: 'REGISTER_FAILED', payload: error.response.data || 'Error en el registro' });
        }
    };

   
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await API.get('/categories');
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al obtener las categorias", error);
            }
        }
        fetchCategorias();
        
    },[])

    useEffect(() => {
        const fetchPlataformas = async () => {
            try {
                const response = await API.get('/plataformas');
                setPlataforma(response.data);
            } catch (error) {
                console.error("Error al obtener las plataformas", error);
            }
        }
        fetchPlataformas();
        
    },[])

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
    };

    const getToken = () => {
        return state.token;
    };

    return (
        <AuthContext.Provider value={{ login, register, logout, getToken, state, loading,
        setJuego,videoJuego,setCategorias,categorias,setPlataforma,plataforma, setCategoriasSeleccionadas,
        categoriasSeleccionadas,setPlataformasSeleccionadas,plataformasSeleccionadas,
        videoJuegoSeleccionados,setVideoJuegosSeleccionados,setSearch,search }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
