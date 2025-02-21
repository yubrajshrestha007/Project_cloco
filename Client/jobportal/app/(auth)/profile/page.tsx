'use client'
import NavBar from '@/components/custom/navigation/header';
import { useState, useEffect } from 'react';
import { User } from '../../../interface'
const Profile = () => {
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = () => {
    fetch('http://localhost:8000/api/users/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setProfile(data)
      })
      .catch(error => console.error(error));
  }

  
  return (
    <div className='container mx-auto py-8'>
      <NavBar />
      <div className='flex flex-col items-center justify-center border-2 p-6 m-6 rounded-lg shadow-lg'>
        <h2 className='font-extrabold text-3xl text-primary mb-6'>Your Details</h2>
        {profile ? (
          <div className='text-lg space-y-3'>
            <p className='text-gray-700'>
              <strong>Username : </strong> {profile.username}
            </p>
            <p className='text-gray-700'>
              <strong>Email : </strong> {profile.email}
            </p>
            <p className='text-gray-700'>
              <strong>Address : </strong> {profile.address}
            </p>
          </div>
        ) : (
          <p className='text-lg text-gray-500'>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
