'use client';

import { useEffect, useState } from "react";
import SuperheroCard from "./SuperheroCard";

const SuperheroCards = ({ data }) => {
  const [pixabay, setPixabay] = useState({});

  useEffect(() => {
    let pixabayLocal = JSON.parse(localStorage.getItem('pixabay_local'));
    if (pixabayLocal) {
      setPixabay(pixabay);
    }
  }, []);

  const storePixabayLocal = () => {
    localStorage.setItem('pixabay_local', JSON.stringify(pixabay))
    setPixabay(pixabay);
  }

  return (
    <div className='flex flex-wrap gap-4'>
      {
        data && data.map((superhero) => (
          <SuperheroCard
            key={superhero.id}
            type='search'
            superhero={superhero}
            pixabay={pixabay}
            setPixabay={setPixabay}
            storePixabayLocal={storePixabayLocal}
          />
        ))
      }
    </div>
  )
}

export default SuperheroCards