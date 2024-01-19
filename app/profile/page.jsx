'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState({});

  const fetchUserData = async () => {
    const response = await fetch(`/api/user/${session.user.id}`)
    const data = await response.json();
    setUser(prevState => ({
      ...prevState,
      ...data[0]
    }));
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <section className='md:px-10 px-2 py-3 w-full max-w-7x1 mx-auto'>
      <div>
        <Image
          src={user.image}
          width={80}
          height={80}
          className='rounded-full bg-primary-white'
          alt='profile'
        />
      </div>
      <div>
        <h2>{user.username}</h2>
      </div>
    </section>
  )
}

export default Profile;