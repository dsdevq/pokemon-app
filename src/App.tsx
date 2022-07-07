import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card } from './components/Card/Card';
import Filter from './components/Filter/Filter';
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
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  // Get Array pokemons
  const getPokemons = async (API: string): Promise<void> => {
    try {
      const result = await fetch(API)
      const response = await result.json()
      // If array 
      if (response.results) {
        setPokemonAPI(response.next)
        onePokemon(response.results)
      }
      // If array with types
      else if (response.pokemon) {
        setPokemons([])
        getPokemonsByType(response.pokemon)
      }
      // If search
      else {
        setPokemons(() => [response])
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  const getPokemonsByType = (array: any[]) => {
    array.map(async (pokemon) => {
      const result = await fetch(pokemon.pokemon.url)
      const newState = await result.json()
      setPokemons((previousState) => {
        return [...previousState, newState]
      })
    })
  }


  const onePokemon = (pokemon: Pokemon[]) => {
    try {
      pokemon.map(async (pokemon) => {
        const result = await fetch('https://pokeapi.co/api/v2/pokemon/' + `${pokemon.name}`)
        const newState = await result.json()
        setPokemons((previousState) => {
          return [...previousState, newState]
        })
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

  //   IF containerHeight true + user scrollDown + user`s window height (its actually whole page) > container height (whole container is scrolled) => then fetch more pokemons 

  return (
    <div className="App">
      <Search getPokemons={getPokemons} setPokemons={setPokemons} pokemons={pokemons} />
      <Filter
        getPokemons={getPokemons}
      />
      <div className="cardbox__container">
        {
          pokemons.length ?
            // ! any type fix
            pokemons.map((pokemon: any) => {
              return (
                <Card key={pokemon.id}
                  id={pokemon.id}
                  attack={pokemon.stats[1].base_stat}
                  type={pokemon.types[0].type.name}
                  defense={pokemon.stats[2].base_stat}
                  health={pokemon.stats[0].base_stat}
                  power={pokemon.base_experience}
                  attacks={pokemon.abilities[0]?.ability.name}
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
