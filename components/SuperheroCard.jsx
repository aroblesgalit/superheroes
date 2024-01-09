'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const SuperheroCard = ({ type, superhero, pixabay, setPixabay, storePixabayLocal }) => {
  const [flipped, setFlipped] = useState(false);
  const [imgSrc, setImgSrc] = useState({
    url: superhero.image.url,
    isPixabay: false
  });

  function calcStat(val) {
    return parseInt(val) * .8;
  }

  async function renderNewImg() {
    try {
      // Check if image has already been fetched before from Pixabay API
      if (superhero.id in pixabay) {
        setImgSrc((prevState) => ({
          ...prevState,
          url: pixabay[superhero.id],
          isPixabay: true
        }));
      } else {
        let responsePixabay = await fetch(`/api/pixabay/search/${superhero.name}`);
        let dataPixabay;
        // Check if image is broken
        if (responsePixabay.ok) {
          dataPixabay = await responsePixabay.json();
        } else {
          responsePixabay = await fetch(`/api/pixabay/search/${superhero.name.split(' ').join()}`);
          dataPixabay = await responsePixabay.json();
        }
        // Set the image url to Pixabay's
        setImgSrc((prevState) => ({
          ...prevState,
          url: dataPixabay,
          isPixabay: true
        }));
        // Update pixabay object with new data
        setPixabay(prevState => ({
          ...prevState,
          [superhero.id]: dataPixabay
        }));
        // Store new data to local storage
        let tempPixabay = structuredClone(pixabay);
        tempPixabay[superhero.id] = dataPixabay;
        storePixabayLocal(tempPixabay);
      }
    } catch (error) {
      console.error(error.message)
    }
    
  }

  return (
    <div className={`card ${flipped && 'flip'}`}>
      <div className="card_inner">
        <div className="card_front">
          <div className="superhero_main" style={{ backgroundImage: `url('${imgSrc.url}')` }}>
            <div className="top_left_dec">
              {/* TypeError: Cannot read properties of undefined (reading 'attack') */}
              <span>ATK: {superhero.battlestats.attack} / DEF: {superhero.battlestats.defense}</span>
            </div>
            <div className="superhero_name">
              <h2 className='w-3/4'>{superhero.name}</h2>
              {
                imgSrc.isPixabay && (
                  <div className='pixabay-disclaimer self-start pt-2 relative ml-auto'>
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className='fa-circle-info color-primary-black cursor-pointer absolute'
                    />
                    <span className='absolute block'>This image is from Pixabay.</span>
                  </div>
                )
              }
              <FontAwesomeIcon
                icon={faRepeat}
                className='fas fa-repeat color-primary-white cursor-pointer text-sm self-start pt-2'
                onClick={() => setFlipped(prev => !prev)}
              />
            </div>
            <div className="superhero_alignment">
              {/* <span>{superhero.biography.alignment == 'good' ? 'hero' : 'villain'}</span> */}
              <span>#{superhero.id}</span>
            </div>
          </div>
        </div>
        <div className="card_back">
          <div className="superhero_header">
            <h2>{superhero.name}</h2>
            <span>#{superhero.id}</span>
          </div>
          <div className="superhero_appearance">
            <div className="superhero_image">
              <Image
                loader={() => imgSrc.url}
                src={imgSrc.url}
                alt={superhero.name}
                width={60}
                height={68}
                onError={() => renderNewImg()}
              />
            </div>
            <div>
              <span>Race: {superhero.appearance.race}</span>
              <span>Gender: {superhero.appearance.gender}</span>
              <span>Height: {superhero.appearance.height[0]}</span>
              <span>Weight: {superhero.appearance.weight[0]}</span>
            </div>
          </div>
          <div className="superhero_biography">
            <span>Full name: {superhero.biography['full-name']}</span>
            <span>Aliases: {superhero.biography.aliases}</span>
            <span>Alignment: {superhero.biography.alignment}</span>
          </div>
          <div className="superhero_powerstats">
            <div>
              <span className='sh_powerstats_name'>STR</span>
              <div className='sh_powerstats_value'>
                <div style={{width: `${calcStat(superhero.powerstats.strength)}%`}} className='superhero_powerstats_bar bg-primary-blue'></div>
                <span>{superhero.powerstats.strength}</span>
              </div>
            </div>
            <div>
              <span className='sh_powerstats_name'>PWR</span>
              <div className='sh_powerstats_value'>
                <div style={{width: `${calcStat(superhero.powerstats.power)}%`}} className='superhero_powerstats_bar bg-primary-blue'></div>
                <span>{superhero.powerstats.power}</span>
              </div>
            </div>
            <div>
              <span className='sh_powerstats_name'>CBT</span>
              <div className='sh_powerstats_value'>
                <div style={{width: `${calcStat(superhero.powerstats.combat)}%`}} className='superhero_powerstats_bar bg-primary-blue'></div>
                <span>{superhero.powerstats.combat}</span>
              </div>
            </div>
            <div>
              <span className='sh_powerstats_name'>INT</span>
              <div className='sh_powerstats_value'>
                <div style={{width: `${calcStat(superhero.powerstats.intelligence)}%`}} className='superhero_powerstats_bar bg-primary-blue'></div>
                <span>{superhero.powerstats.intelligence}</span>
              </div>
            </div>
            <div>
              <span className='sh_powerstats_name'>SPD</span>
              <div className='sh_powerstats_value'>
                <div style={{width: `${calcStat(superhero.powerstats.speed)}%`}} className='superhero_powerstats_bar bg-primary-blue'></div>
                <span>{superhero.powerstats.speed}</span>
              </div>
            </div>
            <div>
              <span className='sh_powerstats_name'>DUR</span>
              <div className='sh_powerstats_value'>
                <div style={{width: `${calcStat(superhero.powerstats.durability)}%`}} className='superhero_powerstats_bar bg-primary-blue'></div>
                <span>{superhero.powerstats.durability}</span>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faRepeat}
              className='fas fa-repeat color-primary-white cursor-pointer text-sm'
              onClick={() => setFlipped(prev => !prev)}
            />
          </div>
        </div>
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