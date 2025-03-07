import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';
function PokemonList(){


    const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon/');
    const[pokemonList,setPokemonList]=useState([]);
    const[isLoading, setIsloading]=useState(true);

    const[nextUrl,setNextUrl]=useState('');
    const [prevUrl,setPrevUrl]=useState('');

async function downloadPokemon(){
    setIsloading(true);
    const response= await axios.get(pokedexUrl);
    
        const pokemonResults= response.data.results;
        
        console.log(response.data);
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
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
        setPokemonList(pokeListResult);
        setIsloading(false);
}
    useEffect(()=>{
        downloadPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pokedexUrl]);

    

    return (
    
        <>
          
            <div className="pokemon-List-wrapper">
                <div>
                    List of Pokemons

                </div><br />
            
                <div className="pokemon-wrapper">
                {(isLoading)? 'Loading..':pokemonList.map((p)=><Pokemon 
                name={p.name}
                 image={p.image} 
                 key={p.id} 
                 id={p.id}
                 />
                 )}
                </div>
                     
                <div className="controls">
                        <button disabled={prevUrl==undefined} onClick={()=> setPokedexUrl(prevUrl)}>Prev</button>
                        <button disabled={
                            nextUrl== undefined
                        } onClick={()=> setPokedexUrl(nextUrl)}>Next</button>
                     </div>
               
            </div>
            
        </>
    )
}
export default PokemonList;
