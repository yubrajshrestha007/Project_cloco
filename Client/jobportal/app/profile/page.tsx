'use client';
import { useState, useEffect } from 'react';
import { User } from '../../interface';
import ProfileCard from '@/components/common/profileCard';
import NavBar from '@/components/header/header';
import{ toast} from 'react-toastify'
const Profile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<{ [key: string]: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    setIsLoading(true);
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
        setAddress(data.address || '');
        setIsAdmin(data.is_superuser || data.is_staff);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
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
          throw data;
        }
        return data;
      })
      .then(data => {
        setProfile(data);
        toast.success("Updated profile successfully")
        setEditMode(false);
        setError(null);
      })
      .catch(errorData => {
        if (errorData?.errors) {
          const formattedErrors: { [key: string]: string } = {};
          Object.keys(errorData.errors).forEach(key => {
            if (Array.isArray(errorData.errors[key])) {
              formattedErrors[key] = errorData.errors[key][0];
            }
          });
          setError(formattedErrors);
        } else {
          setError({ general: "An unexpected error occurred." });
          toast.error("Unexpected Error")
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

  const cancelEdit = () => {
    setUsername(profile?.username || '');
    setEmail(profile?.email || '');
    setAddress(profile?.address || '');
    setEditMode(false);
    setError(null);
  }

  return (
    <div className="container mx-auto py-8">
      <NavBar />
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ProfileCard
          profile={profile}
          username={username}
          email={email}
          address={address}
          isAdmin={isAdmin}
          editMode={editMode}
          error={error}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onCancelEdit={cancelEdit}
          onUpdateProfile={updateProfile}
          onEditMode={() => setEditMode(true)}
        />
      </div>
    </div>
  );
};

export default Profile;