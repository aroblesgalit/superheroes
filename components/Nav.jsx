"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    (async() => {
      const response = await getProviders();
      setProviders(response);
    })();
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
            session?.user ? (
              <div className='flex items-center gap-3 md:gap-5 text-primary-white text-sm'>
                <Link href='/collection'>
                  Collection
                </Link>
                <button
                  type='button'
                  onClick={signOut}
                  className='border rounded-full px-5 py-1.5 transition-all hover:text-primary-white hover:bg-primary-black hover:border-primary-black'
                >
                  Sign out
                </button>
                <Link href='/profile'>
                  <Image 
                    src={session?.user.image}
                    width={32}
                    height={32}
                    className='rounded-full bg-primary-white'
                    alt='profile'
                  />
                </Link>
              </div>
            ) : (
              <div className='flex items-center gap-3 md:gap-5 text-primary-white text-sm'>
                <Link href='/collection'>
                  Collection
                </Link>
                {
                  providers && 
                  Object.values(providers).map((provider) => (
                    <button
                      type='button'
                      key={provider.name}
                      onClick={() => signIn(provider.id)}
                      className='border rounded-full px-5 py-1.5 bg-primary-white text-primary-black transition-all hover:text-primary-white hover:bg-primary-black hover:border-primary-black'
                    >
                      Sign in
                    </button>
                  ))
                }
              </div>
            )
          }
        </div>

        {/* Mobile navigation */}
        <div className='sm:hidden flex items-center relative text-sm text-primary-white'>
          {
            session?.user ? (
              <div className="flex">
                <Image 
                  src={session?.user.image}
                  width={32}
                  height={32}
                  className='rounded-full bg-primary-white'
                  alt='profile'
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />
                {
                  toggleDropdown && (
                    <div className='absolute right-0 top-full mt-3 w-full p-5 rounded-md bg-primary-red min-w-[210px] flex flex-col gap-2 justify-end items-end'>
                      <Link
                        href='/profile'
                        className='text-sm text-primary-white'
                        onClick={() => setToggleDropdown(false)}
                      >
                        My profile
                      </Link>
                      <Link
                        href='/collection'
                        className='text-sm text-primary-white'
                        onClick={() => setToggleDropdown(false)}
                      >
                        Collection
                      </Link>
                      <button
                        type='button'
                        onClick={() => {
                          setToggleDropdown(false);
                          signOut();
                        }}
                        className='mt-5 w-full border rounded-full px-5 py-1.5 transition-all hover:text-primary-white hover:bg-primary-black hover:border-primary-black'
                      >
                        Sign out
                      </button>
                    </div>
                  )
                }
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
                      className='border rounded-full px-5 py-1.5 bg-primary-white text-primary-black transition-all hover:text-primary-white hover:bg-primary-black hover:border-primary-black'
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