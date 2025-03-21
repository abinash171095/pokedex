import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){

    const [pokemonListState,setPokemonListState]=useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon',
        nextUrl:'',
        prevUrl:'',
        
    });
    async function downloadPokemon(){
      
             
                // if(pokemonListState.type){
                //     const response= await axios.get(`https://pokeapi.co/api/v2/type/${pokemonListState.type}`);
                //     setPokemonListState((state)=>({
                //         ...state,
                //         pokemonList: response.data.pokemon
                //     }));
                
               // } else{
                      // setIsloading(true);
        setPokemonListState((state)=>({...state,isLoading: true}));
        
        const response= await axios.get(pokemonListState.pokedexUrl);
        
            const pokemonResults= response.data.results;
            
            console.log("response ise",response.data.pokemon);
            console.log(pokemonListState)
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
     },[pokemonListState.pokedexUrl]);

     return{
        pokemonListState, setPokemonListState
     };
    }
export default usePokemonList;

