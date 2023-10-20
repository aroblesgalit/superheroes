"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    fetchProviders();
  }, [])

  return (
    <nav className='w-full bg-primary-red flex justify-center'>
      <div className='md:px-10 px-2 py-3 w-full max-w-7xl flex justify-between'>
        <Link href='/' className='flex items-center'>
          <Image 
            src='/assets/images/superheroes-icon-white.svg'
            alt='Superheroes logo'
            width={40}
            height={40}
          />
          <p className='font-anton text-primary-white text-2xl max-sm:hidden'>Superheroes</p>
        </Link>

        {/* Desktop navigation */}
        <div className='sm:flex hidden'>
          {
            isUserLoggedIn ? (
              <div className='flex items-center gap-3 md:gap-5 text-primary-white text-sm'>
                <Link href='/collection'>
                  Collection
                </Link>
                <button
                  type='button'
                  onClick={signOut}
                  className='border rounded-full px-5 py-1.5 transition-all hover:bg-primary-black hover:border-primary-black'
                >
                  Sign out
                </button>
                <Link href='/profile'>
                  <Image 
                    src='/assets/images/superheroes-icon-red.svg'
                    width={32}
                    height={32}
                    className='rounded-full bg-primary-white'
                    alt='profile'
                  />
                </Link>
              </div>
            ) : (
              <>
                {
                  providers && 
                  Object.values(providers).map((provider) => (
                    <button
                      type='button'
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className='border rounded-full px-5 py-1.5 bg-primary-white transition-all hover:bg-primary-black hover:border-primary-black'
                    >
                      Sign in
                    </button>
                  ))
                }
              </>
            )
          }
        </div>

        {/* Mobile navigation */}
        <div className='sm:hidden flex items-center relative'>
          {
            isUserLoggedIn ? (
              <div className="flex">
                <Image 
                  src='/assets/images/superheroes-icon-red.svg'
                  width={32}
                  height={32}
                  className='rounded-full bg-primary-white'
                  alt='profile'
                  onClick={() => {}}
                />
              </div>
            ) : (
              <>
                {
                  providers && 
                  Object.values(providers).map((provider) => (
                    <button
                      type='button'
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className='border rounded-full px-5 py-1.5 bg-primary-white transition-all hover:bg-primary-black hover:border-primary-black'
                    >
                      Sign in
                    </button>
                  ))
                }
              </>
            )
          }
        </div>
      </div>
      
    </nav>
  )
}

export default Nav