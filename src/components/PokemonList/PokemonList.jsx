import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
function PokemonList(){


   // const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon/');
  //  const[pokemonList,setPokemonList]=useState([]);
  //  const[isLoading, setIsloading]=useState(true);

  //  const[nextUrl,setNextUrl]=useState('');
  //  const [prevUrl,setPrevUrl]=useState('');
const [pokemonListState,setPokemonListState]=useState({
    pokemonList:[],
    isLoading:true,
    pokedexUrl:'https://pokeapi.co/api/v2/pokemon/',
    nextUrl:'',
    prevUrl:''
});
async function downloadPokemon(){
   // setIsloading(true);
   setPokemonListState((state)=>({...state,isLoading: true}));
    const response= await axios.get(pokemonListState.pokedexUrl);
    
        const pokemonResults= response.data.results;
        
        console.log(response.data);
        setPokemonListState((state)=>({
            ...state,
            nextUrl:response.data.next,
            prevUrl:response.data.previous
        }));
       
        console.log(pokemonResults);

        const pokemonResultPromise=pokemonResults.map((pokemon)=>axios.get(pokemon.url));
        const pokemonData=await axios.all(pokemonResultPromise);
        console.log(pokemonData);
        const pokeListResult=(pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;

            return{
                id:pokemon.id,
                name: pokemon.name, 
                image: (pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
                 types: pokemon.types
            }
        }));
        console.log(pokeListResult);
        setPokemonListState((state)=>({
            ...state,
            pokemonList:pokeListResult,
            isLoading:false
        }));
        
}
    useEffect(()=>{
        downloadPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pokemonListState.pokedexUrl]);

    

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
