
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
import usePokemonList from "../../hooks/usePokemonList";
function PokemonList(){

    const {pokemonListState,setPokemonListState}=usePokemonList(false);
   // const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon/');
  //  const[pokemonList,setPokemonList]=useState([]);
  //  const[isLoading, setIsloading]=useState(true);

  //  const[nextUrl,setNextUrl]=useState('');
  //  const [prevUrl,setPrevUrl]=useState('');

    

    return (
    
        <>
          
            <div className="pokemon-List-wrapper">
                <div>
                    List of Pokemons

                </div><br />
            
                <div className="pokemon-wrapper">
                {(pokemonListState.isLoading)? 'Loading..':pokemonListState.pokemonList.map((p)=><Pokemon 
                name={p.name}
                 image={p.image} 
                 key={p.id} 
                 id={p.id}
                 />
                 )}
                </div>
                     
                <div className="controls">
                        <button disabled={pokemonListState.prevUrl==undefined} onClick={()=> {
                            const UrlToSet= pokemonListState.prevUrl;
                            setPokemonListState({...pokemonListState,pokedexUrl:UrlToSet})}}>Prev</button>
                        <button disabled={
                            pokemonListState.nextUrl== undefined
                        } onClick={()=> { 
                            const UrlToSet= pokemonListState.nextUrl;
                            setPokemonListState({...pokemonListState,pokedexUrl:UrlToSet})}}>Next</button>
                     </div>
               
            </div>
            
        </>
    )
}
export default PokemonList;
