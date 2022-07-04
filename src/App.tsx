import React, { ReactNode, useEffect, useState } from 'react';
import { Card } from './components/Card/Card';
import './styles.scss'

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/'

export interface Pokemon {
  id: number,
  name: string,
  power: number,
  img: string,
  attack: number,
  defense: number,
  attacks: string,
  health: number,
  type: string
}

function App() {

  const [pokemonAPI, setPokemonAPI] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  const [pokemons, setPokemons] = useState([])

  const getPokemons = async (API: string) => {
    const result = await fetch(API)
    const response = await result.json()
    console.log(response)

    setPokemonAPI(response.next)
    onePokemon(response.results)
  }

  const onePokemon = (pokemon: Array<Pokemon>) => {
    pokemon.map(async (pokemon) => {
      const result = await fetch(POKEMON_API + `${pokemon.name}`)
      const newState = await result.json()
      console.log(newState)
      setPokemons((previousState): any => Array.from(new Set ([...previousState, newState])))
    })
  }

  useEffect(() => {
    getPokemons(pokemonAPI)
  }, [])

  return (
    <div className="App">
      <div className="cardbox__container">
        {pokemons?.length && pokemons.map((pokemon: any,  index) : Pokemon | any => {
          return (
            <Card key={index}
            id={pokemon.id}
            attack={pokemon.stats[1].base_stat}
            type={pokemon.types[0].type.name}
            defense={pokemon.stats[2].base_stat}
            health={pokemon.stats[0].base_stat}
            power={pokemon.base_experience}
            attacks={pokemon.abilities[0].ability.name}
            name={pokemon.name}
            img={pokemon.sprites.other.dream_world.front_default}
            />
            ) 
          })}
      </div>
    </div>
  );
}

export default App;
