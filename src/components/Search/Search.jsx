
import useDebounce from '../../hooks/useDebounce';
import './Search.css'
function Search({updateSearchTerm}){
   // const [searchTerm,setsearchTerm] = useState('');
   const debounceCallBack=useDebounce((e)=>updateSearchTerm(e.target.value))
    return(
        <div className='search-wrapper'>
            <input
            id="pokemon-name-search"
            type="text"
            placeholder="pokemon name..."
            onChange={(e)=>debounceCallBack(e,'123')}
            />
            
        </div>
    )

    
}
export default Search;
