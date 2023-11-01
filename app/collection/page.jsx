'use client';

import { useState } from 'react';
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

  const searchSuperheroes = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`/api/superheroes/search/${query}`);
      const data = await response.json();
      console.log(data.results);
      setSuperheroes({
        ...superheroes,
        searchResults: data.results
      })
      
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