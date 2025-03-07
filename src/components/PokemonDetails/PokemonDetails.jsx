import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css'

function PokemonDetails(){

    const {id}=useParams();
    console.log(id);
    const [pokemon,setPokemon]=useState({});
    async function downloadPokemon(){
        const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        console.log(response.data);
        setPokemon({
           name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            base_experience: response.data.base_experience,
            types: response.data.types.map((t)=>t.type.name),
           moves: response.data.moves.map((m)=>m.move.name)


        })
    }
    useEffect(()=>{
        downloadPokemon();
    },[id]);

    return(
        <div className="pokemon-details-wrapper">
            <div className="pokemon-details-name">
                <span>{pokemon.name}</span>
            </div>
            <img src={pokemon.image} alt="" className="pokemon-details-image" />
            <div className="pokemon-details-name">Height: <span>{pokemon.height}</span></div>
            <div className="pokemon-details-name">weigth: <span>{pokemon.weigth}</span></div>
            <div className="base-experience-details">Base:{pokemon.base_experience}</div>
            <div className="pokemon-details-types">Types:

            {pokemon.types && pokemon.types.map((t)=><div key={t}>{t}</div>)}
            </div>
            <div className="pokemon-details-moves">Moves:<br></br>
            {pokemon.moves && pokemon.moves.map((m)=><div key={m}>{m}</div>)}
            </div>
        </div>
    );

}
export default PokemonDetails;