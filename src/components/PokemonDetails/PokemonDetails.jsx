
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

import usePokemonDetails from "../../hooks/usePokemonDetails";

function PokemonDetails({pokemonName}){

   
    const {id}=useParams();
    const[pokemon]=usePokemonDetails(id, pokemonName);
    

    return(
        <div className="pokemon-details-wrapper">
            <div className="pokemon-details-name">
                <span>{pokemon.name}</span>
            </div>
            <img src={pokemon.image} alt="" className="pokemon-details-image" />
            <div className="pokemon-details-name">Height: <span>{pokemon.height}</span></div>
            <div className="pokemon-details-name">weigth: <span>{pokemon.weight}</span></div>
            <div className="base-experience-details">Base:{pokemon.base_experience}</div>
            <div className="pokemon-details-types">Types:

            {pokemon.types && pokemon.types.map((t)=><div key={t}>{t}</div>)}
            </div>
            <div className="pokemon-details-moves">Moves:<br></br>
            {pokemon.moves && pokemon.moves.slice(0,5).map((m)=><div key={m}>{m}</div>)}
            </div>
           
                <div>
                    {
                       pokemon.types && pokemon.similarPokemons && 
                        <div>
                            more {pokemon.types[0]} type pokemons
                            <ul>
                           { pokemon.similarPokemons.map((p)=><li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                            </ul>
                        </div>
                    }
                </div>
        </div>
    );

}
export default PokemonDetails;