import React, { useState } from 'react'
import './Search.scss'
import PokemonLogo from '../../assets/pokemonLogo.png'
import Filter from '../Filter/Filter'

const SEARCH_API = 'https://pokeapi.co/api/v2/pokemon/'

export default function Search({ getPokemons, pokemons, setPokemons }: any) {

  const [search, setSearch] = useState('')

  const handleOnChange = (e: any) => {
    setSearch(e.target.value)
  }

  const handleOnSubmit = (e: any) => {
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
      <Filter pokemons={pokemons} setPokemons={setPokemons} />

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
