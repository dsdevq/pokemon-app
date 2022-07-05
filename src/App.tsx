import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Card } from './components/Card/Card';
import Search from './components/Search/Search';
import './styles.scss'

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

  // Get pokemon list API
  const [pokemonAPI, setPokemonAPI] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20')

  // Empty array for pokemons
  const [pokemons, setPokemons] = useState([])

  // Get Array pokemons
  const getPokemons = async (API: string) => {
    try {
      const result = await fetch(API)
      const response = await result.json()
      // If array 
      if (response.results) {
        setPokemonAPI(response.next)
        onePokemon(response.results)
      }
      else {
        setPokemons((): any => [response])
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  const onePokemon = (pokemon: Array<Pokemon>) => {
    try {
      pokemon.map(async (pokemon) => {
        const result = await fetch('https://pokeapi.co/api/v2/pokemon/' + `${pokemon.name}`)
        const newState = await result.json()
        setPokemons((previousState): any => [...previousState, newState])
      })
    }
    catch (e) {
      console.error(e)
    }
  }

  // TO AVOID RENDERING TWICE 
  const effectRan = useRef(false)

  useEffect(() => {

    if (effectRan.current === false) {
      getPokemons(pokemonAPI)
    }

    return () => {
      effectRan.current = true
    }
  }, [])

  return (
    <div className="App">
      <Search getPokemons={getPokemons} setPokemons={setPokemons} pokemons={pokemons} />

      <div className="cardbox__container">
        {
          pokemons.length ?
            pokemons.map((pokemon: any, index): Pokemon | any => {
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
            })
            :
            (<h1 className='cardbox__noPokemons'>
              No pokemons found
            </h1>)
        }
      </div>
      <button className='button' onClick={() => getPokemons(pokemonAPI)}>
        More pokemons
      </button>
    </div>
  );
}

export default App;
