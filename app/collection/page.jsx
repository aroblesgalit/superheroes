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
    inViews: []
  });
  const [pagination, setPagination] = useState({
    pages: [],
    current: 1
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

  // Pagination
 
  // Updates list of superheroes in view
  function updateViewList(page, results) {
    let min = (page - 1) * 20;
    let max = min + 19;
    // Only return as much as how many exists
    let tempViewList = [];
    for (let i = min; i <= max; i++) {
      if (!results[i]) return;
      tempViewList.push(results[i]);
      setSuperheroes({
        ...superheroes,
        inViews: tempViewList
      });
    }
  }

  // Creates list of pages
  function createPages(results) {
    const total = Math.ceil(results.length / 20);
    const tempPages = [];
    for (let i = 1; i < total + 1; i++) {
      tempPages.push(i);
    }
    setPagination({
      ...pagination,
      pages: tempPages
    })
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
      {/* Pagination */}
    </section>
  )
}

export default Collection;