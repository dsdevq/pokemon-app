import React, { useEffect, useState } from 'react'
import { backgroundColors } from '../Card/Card'
import { Props } from '../Search/Search'
import './Filter.scss'

export default function Filter({ pokemons, setPokemons }: Props) {

  // Чтобы выгружать определенные типы, необходимо getPokemons(все покемоны отдельно кликнутого типа) "https://pokeapi.co/api/v2/type/{кликнутыйТип}/" 

  // Filtering by type
  const [types, setTypes] = useState([])

  // Getting all types
  useEffect(() => {
    getTypes('https://pokeapi.co/api/v2/type')
    // getTypes("https://pokeapi.co/api/v2/type/1/")
  }, [])
  // 
  const getTypes = async (API: string) => {
    const response = await fetch(API)
    const result = await response.json()
    // console.log(result)
    // console.log(result.results)
    setTypes(result.results)
  }

  const filterByType = (pressedType: any) => {
    const array = pokemons
    const filtered = array.filter((value : any) => {
      return value.types[0].type.name === pressedType
    })
    setPokemons(filtered)
  }

  const setButtonColor = (backgroundColor: string | undefined) => {
    if (backgroundColor === 'blue' || backgroundColor === 'black') {
      return 'white'
    }
  }

  return (
    <>
      {types?.length && types.map((type: any, index) => {
        return (
          <button className='filterButton'
            key={index} onClick={() => filterByType(type.name)}
            style={{
              background: backgroundColors[type.name] || 'white',
              color: setButtonColor(backgroundColors[type.name])
            }}
          >
            {type.name}
          </button>
        )
      }
      )}
    </>
  )
}
