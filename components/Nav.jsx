"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  return (
    <nav className='w-full bg-primary-red flex justify-center'>
      <div className='md:px-10 px-2 py-3 w-full max-w-7xl flex justify-between'>
        <Link href='/' className='flex items-center'>
          <Image 
            src='/assets/images/superheroes-icon-white.svg'
            alt="Superheroes logo"
            width={32}
            height={32}
          />
          <p className='font-anton text-primary-white text-xl max-sm:hidden'>Superheroes</p>
        </Link>
      </div>
      
    </nav>
  )
}

export default Nav