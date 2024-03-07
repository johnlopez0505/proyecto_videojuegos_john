import '../components/SearchComponent.css';
import { useAuth } from "../context/AuthProvider"

const SearchComponent = () => {
   
  const {setSearch,search} = useAuth();
    const searcher = (e) => {
        setSearch(e.target.value);   
    }

    
    return (
      <>
          <input type='text' value={search} onChange={searcher} placeholder='Buscar videojuego' className='input'/>
      </>
    )
  }
  export default SearchComponent