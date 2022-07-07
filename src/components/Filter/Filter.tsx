import React, { useEffect, useState } from 'react'
import { backgroundColors } from '../Card/Card'
import { Props } from '../Search/Search'
import './Filter.scss'

export default function Filter({ getPokemons }: Props) {

  // Чтобы выгружать определенные типы, необходимо getPokemons(все покемоны отдельно кликнутого типа) "https://pokeapi.co/api/v2/type/{кликнутыйТип}/" 

  // Filtering by type
  const [types, setTypes] = useState([])

  // Getting all types
  useEffect(() => {
    getTypes('https://pokeapi.co/api/v2/type')
  }, [])
  // 
  const getTypes = async (API: string) => {
    const response = await fetch(API)
    const result = await response.json()
    // Slicing last 2 types, because they`re null 
    setTypes(result.results.slice(0, result.results.length - 2))
  }


  const setButtonColor = (backgroundColor: string | undefined) => {
    if (backgroundColor === 'blue' || backgroundColor === 'black') {
      return 'white'
    }
  }

  return (
    <>
    <div className='type__container'>
      {types?.length && types.map((type: any, index) => {
        return (
          <button className='filterButton'
            id={(index+1).toString()}
            key={index} 
            onClick={() => getPokemons(`https://pokeapi.co/api/v2/type/${index + 1}`)}
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
      </div>
    </>
  )
}
