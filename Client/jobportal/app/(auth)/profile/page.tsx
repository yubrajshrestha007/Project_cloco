'use client'
import NavBar from '@/components/custom/navigation/header';
import { useState, useEffect } from 'react';
import { User } from '../../../interface'

const Profile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<{ [key: string]: string } | null>(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    fetch('http://localhost:8000/api/users/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setProfile(data);
        setUsername(data.username);
        setEmail(data.email);
        setAddress(data.address);
      })
      .catch(error => console.error(error));
  }

  const updateProfile = () => {
    fetch('http://localhost:8000/api/users/profile/update', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        address
      })
    })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          throw data;  // Throw the API response if there's an error
        }
        return data;
      })
      .then(data => {
        setProfile(data);
        setEditMode(false);
        setError(null);
      })
      .catch(errorData => {
        if (errorData?.errors) {
          const formattedErrors: { [key: string]: string } = {};
          Object.keys(errorData.errors).forEach(key => {
            if (Array.isArray(errorData.errors[key])) {
              formattedErrors[key] = errorData.errors[key][0]; // Get the first error message
            }
          });
          setError(formattedErrors);
        } else {
          setError({ general: "An unexpected error occurred." });
        }
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'address':
        setAddress(value);
        break;
      default:
        break;
    }
  }

  const handleEditMode = () => {
    setEditMode(true);
  }

  return (
    <div className='container mx-auto py-8'>
      <NavBar />
      <div className='flex flex-col items-center justify-center border-2 p-6 m-6 rounded-lg shadow-lg'>
        <h2 className='font-extrabold text-3xl text-primary mb-6'>Your Details</h2>
        {profile ? (
          <div className='text-lg space-y-3'>
            {editMode ? (
              <div>
                <label>UserName:
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                    className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {error?.username && <p className="text-red-500 text-sm">{error.username}</p>}
                </label>

                <label>Email:
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {error?.email && <p className="text-red-500 text-sm">{error.email}</p>}
                </label>

                <label>Address:
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleInputChange}
                    className="block w-full p-2 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>

                {error?.general && <p className="text-red-500 text-sm">{error.general}</p>}
                <button onClick={updateProfile}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p className='text-gray-700'>
                  <strong>Username : </strong> {username}
                </p>
                <p className='text-gray-700'>
                  <strong>Email : </strong> {email}
                </p>
                <p className='text-gray-700'>
                  <strong>Address : </strong> {address}
                </p>
                <button onClick={handleEditMode}>
                  Edit
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className='text-lg text-gray-500'>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
