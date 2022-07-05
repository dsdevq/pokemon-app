import React, { FunctionComponent } from 'react'
import './Card.scss'
import { Pokemon } from '../../App'

export interface Colors {
  [key: string]: string | undefined
}

export const backgroundColors: Colors = {
  fire: 'red',
  fighting: 'orange',
  rock: 'orange',
  ground: 'orange',
  dragon: 'gold',
  electric: 'yellow',
  grass: 'green',
  bug: 'green',
  poison: 'green',
  water: 'blue',
  ice: 'blue',
  fairy: 'pink',
  ghost: 'pink',
  physic: 'purple',
  dark: 'black',
  steel: 'silver',
  normal: 'white',
  flying: 'white'
}

export const Card: FunctionComponent<Pokemon> = ({ id, name, attack, defense, power, attacks, health, img, type }) => {




  return (
    <div className="card__body" id={id.toString()}
      style={{
        // $color: blue, $amount: 10%
        borderColor: backgroundColors[type],
        filter: 'brightness(90%)',
        // 110 deg
        background: `linear-gradient(270deg, ${backgroundColors[type]} 0%, #3A1C71 100%)`,
      }}
    >
      <header className="card__header">
        <img className='card__img' src={img} alt="Pokemon" />
      </header>

      <main className="card__main pokemon-details">

        <label className="pokemon-details__type">
          {type}
        </label>

        <h3 className="pokemon-details__name">
          {name}
        </h3>

        <section className="pokemon-details__stats">
          <p className="pokemon-details__param">
            Power: {power}
          </p>
          <p className="pokemon-details__param">
            Damage: {attack}
          </p>
          <p className="pokemon-details__param">
            Attacks: {attacks}
          </p>
          <p className="pokemon-details__param">
            Health: {health}
          </p>
          <p className="pokemon-details__param">
            Defense: {defense}
          </p>
        </section>

        <section className="pokemon-details__card-footer">
          Pokemon Card
        </section>
      </main>
    </div>
  )
}
