import Link from 'next/link';

const Profile = ({profile}) => {
  const handleLogout = () => {
    localStorage.removeItem('access');
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Address: {profile.Address}</p>
      <Link href="/login">
        <button onClick={handleLogout}>Logout</button>
      </Link>
    </div>
  );
};

export default Profile;
