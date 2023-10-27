'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import SearchBar from '@components/SearchBar';

const Collection = () => {
  const [query, setQuery] = useState('')

  const searchSuperheroes = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`/api/superheroes/search/${query}`);
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <section className='md:px-10 px-2 py-3 w-full max-w-7xl'>
      <div className='flex items-center gap-6'>
        <h1 className='page_title'>Search superheroes</h1>
        <SearchBar
          type='superheroes'
          query={query}
          setQuery={setQuery}
          handleSubmit={searchSuperheroes}
        />
      </div>
    </section>
  )
}

export default Collection;