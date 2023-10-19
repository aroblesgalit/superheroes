"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  return (
    <nav className='w-full bg-primary-red flex justify-center'>
      <div className='flex-between px-10 py-3 w-full max-w-7xl'>
        <Link href='/' className='flex gap-2 flex-center'>
          <Image 
            src='/assets/images/superheroes-logo-white.svg'
            alt="Superheroes logo"
            width={230}
            height={48}
          />
        </Link>
      </div>
      
    </nav>
  )
}

export default Nav