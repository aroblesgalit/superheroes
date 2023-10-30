'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

const SuperheroCard = ({ type, superhero }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`card ${flipped && 'flip'}`}>
      <div className="card_inner">
        <div className="card_front">
          <div className="superhero_main" style={{ backgroundImage: `url(${superhero.image.url})` }}>
            <div className="superhero_name">
              {superhero.name}
              <FontAwesomeIcon
                icon={faRepeat}
                className='fas fa-repeat color-primary-white'
                onClick={() => setFlipped(prev => !prev)}
              />
            </div>
            <div className="superhero_alignment">{superhero.biography.alignment == 'good' ? 'hero' : 'villain'}</div>
          </div>
        </div>
        <div className="card_back">Card back</div>
      </div>
    </div>
  )
}

export default SuperheroCard

// Custom
// type: STRING - search | user | battle
// attack: INT - based on average of selected powerstats (combat, power, strength)
// defense: INT - based on average of selected powerstats (durability, intelligence, speed)

// API
// appearance > race: STRING
//            > gender: STRING
//            > height: ARRAY - 0: ft in | 1: cm
//            > weight: ARRAY - 0: lb | 1: kg
// biography > aliases: ARRAY
//           > alignment: STRING
//           > full-name: STRING
//           > publisher: STRING
// id: STRING
// image > url: STRING
// name: STRING
// powerstats > combat: STRING
//            > durability: STRING
//            > intelligence: STRING
//            > power: STRING
//            > speed: STRING
//            > strength: STRING