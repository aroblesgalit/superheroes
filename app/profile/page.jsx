'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();
  console.log(session)

  return (
    <section className='md:px-10 px-2 py-3 w-full max-w-7x1 mx-auto'>
      <div>
        <Image
          src={session?.user.image}
          width={80}
          height={80}
          className='rounded-full bg-primary-white'
          alt='profile'
        />
      </div>
      <div>
        <h2>{session?.user.username}</h2>
      </div>
    </section>
  )
}

export default Profile;