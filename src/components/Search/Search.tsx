import React, { SetStateAction, useState } from 'react'
import './Search.scss'
import PokemonLogo from '../../assets/pokemonLogo.png'
import { Pokemon } from '../../App'

const SEARCH_API = 'https://pokeapi.co/api/v2/pokemon/'

export interface Props {
  getPokemons: (url: string) => Promise<void>,
  pokemons?: Pokemon[],
  setPokemons?: React.Dispatch<React.SetStateAction<Pokemon[]>>
}

export default function Search({ getPokemons }: Props) {

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
      <a href="reload">
        <img
          src={PokemonLogo} alt="Logo"
        />
      </a>
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
