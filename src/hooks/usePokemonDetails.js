import axios from "axios";
import { useEffect, useState } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id){

    let pokemonListHookResponse =[];
  
    console.log(id);
    const [pokemon,setPokemon]=useState({});
   // const { pokemonListState, setPokemonListState } = usePokemonList();
    async function downloadPokemon(){
        
        const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        console.log(response.data);
       const pokemonOfSameTyepes= await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types? response.data.types[0].type.name: ''}`);
       
       console.log("pokemon of same types",pokemonOfSameTyepes);
        setPokemon(state=>({
            ...state,
           name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            base_experience: response.data.base_experience,
            types: response.data.types.map((t)=>t.type.name),
           moves: response.data.moves.map((m)=>m.move.name),
            similarPokemons:pokemonOfSameTyepes.data.pokemon.slice(0,5)

        }));
        pokemonOfSameTyepes.then((response)=>{
            setPokemon(state=>({
                ...state,
                similarPokemons: response.data.pokemon,
                


            }));
        })
        console.log(response.data.types);      setPokemonListState({...pokemonListState, type:response.data.types? response.data.types[0].type.name: ''})
    // setPokemonListState((prevState) => ({
    //     ...prevState,
    //     type: response.data.types ? response.data.types[0].type.name : ''
    //   }));
    }
   const {pokemonListState, setPokemonListState}= usePokemonList();
    const { pokedexUrl } = pokemonListState;
     useEffect(()=>{
            downloadPokemon();
            console.log("list",pokemonListHookResponse.types,pokemonListState);
        },[ id,pokedexUrl]);
        return[pokemon,pokemonListState,setPokemonListState];
}
export default usePokemonDetails;