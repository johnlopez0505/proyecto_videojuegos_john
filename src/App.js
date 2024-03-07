import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthProvider';
import Loading from './components/Loading';
import AddCartForm from './components/AddGameForm';
import ViewCarts from './components/ViewGame';
import EditCartForm from './components/EditCartForm';
import CheckBox from './components/CheckBox';
import DetailGame from './components/DetailGame';
import About from './components/About';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <Loading/>;
  }

  return (<>
    <Routes>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/registro" element={<RegisterForm/>}/>
      <Route path="" exact element={<PrivateRoute><Home/></PrivateRoute>}>
        <Route index path="/videojuegos" element={ <div><PrivateRoute><CheckBox/></PrivateRoute><PrivateRoute><ViewCarts/></PrivateRoute></div>}/>
        <Route path='/game/:id' element={<DetailGame/>} />
        <Route paht='/about' element={<PrivateRoute><About/></PrivateRoute>}/>
        <Route path="/nuevo" element={<PrivateRoute><AddCartForm/></PrivateRoute>}/>
        <Route path="/editar" element={<PrivateRoute><EditCartForm/></PrivateRoute>}/>
      </Route>
    </Routes>
  </>
    
  );
}

export default App;
