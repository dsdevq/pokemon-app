import React, { useState } from 'react'
import './Search.scss'
import PokemonLogo from '../../assets/pokemonLogo.png'
import Filter from '../Filter/Filter'
import { Pokemon } from '../../App'

const SEARCH_API = 'https://pokeapi.co/api/v2/pokemon/'

export interface Props {
  getPokemons: (url: string) => Promise<void>,
  pokemons: Pokemon[],
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>
}

export default function Search({getPokemons, pokemons, setPokemons} : Props )  {

  const [search, setSearch] = useState('')

  const handleOnChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setSearch(e.target.value)
  }

  const handleOnSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    if (search) {
      getPokemons(SEARCH_API + search.toString().toLowerCase())
      setSearch('')
    }
  }

  return (
    <header className="header">
      <img
        src={PokemonLogo} alt="Logo"
      />
      <Filter pokemons={pokemons} setPokemons={setPokemons} 
      // ! Fix 
      getPokemons={function (url: string): Promise<void> {
        throw new Error('Function not implemented.')
      } } />

      <form onSubmit={handleOnSubmit}>
        <input
          placeholder='Search pokemon...'
          value={search}
          type="text" onChange={handleOnChange}
        />
        <button className='submitButton' type="submit"> Search </button>
      </form>

    </header>
  )
}
