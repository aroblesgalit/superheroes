'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import SearchBar from '@components/SearchBar';
import SuperheroCards from '@components/SuperheroCards';

const Collection = () => {
  const [query, setQuery] = useState('');
  const [superheroes, setSuperheroes] = useState({
    db: [],
    searchResults: [],
  });

  const fetchSuperheroes = async () => {
    const response = await fetch('/api/superheroes');
    const data = await response.json();
    setSuperheroes({
      ...superheroes,
      db: data,
      searchResults: data.filter((item, i) => i < 20)
    })
  };

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const addSuperheroes = async (superheroes) => {
    try {
      superheroes.forEach( async (superhero, index) => {
        const response = await fetch(`/api/superheroes/${superhero.id}`);
        const data = await response.json();

        if (!data.length) {
          const newSuperhero = await fetch(`/api/superheroes/${superhero.id}`, {
            method: 'POST',
            body: JSON.stringify(superhero)
          });

          if (newSuperhero.ok) {
            console.log('New Superhero added to the DB.')
          }
        }
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  const searchSuperheroes = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`/api/superheroes/search/${query}`);
      const data = await response.json();
      console.log(data)
      setSuperheroes({
        ...superheroes,
        searchResults: data.results
      })

      if (!data.results.length) return;
      addSuperheroes(data.results);
      if (!query) {
        setSuperheroes({
          ...superheroes,
          searchResults: superheroes.db.filter((item, i) => i < 20)
        })
      }
      
    } catch (error) {
      console.error(error.message);
    }
  }

  

  return (
    <section className='md:px-10 px-2 py-3 w-full max-w-7xl mx-auto'>
      <div className='flex items-center gap-6'>
        <h1 className='page_title'>Search superheroes</h1>
        <SearchBar
          type='superheroes'
          query={query}
          setQuery={setQuery}
          handleSubmit={searchSuperheroes}
        />
      </div>
      <SuperheroCards 
        data={superheroes.searchResults}
      />
    </section>
  )
}

export default Collection;