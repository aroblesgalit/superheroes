'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import SearchBar from '@components/SearchBar';

const Collection = () => {
  const [query, setQuery] = useState('')

  const searchSuperheroes = () => {
    
  }
  return (
    <SearchBar
      type='superheroes'
      query={query}
      setQuery={setQuery}
      handleSubmit={searchSuperheroes}
    />
  )
}

export default Collection;