"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  return (
    <nav className='flex-between w-full mb-16'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
          src='/assets/images/superheroes-logo-black.svg'
          alt="Superheroes logo"
          width={230}
          height={48}
        />
      </Link>
    </nav>
  )
}

export default Nav