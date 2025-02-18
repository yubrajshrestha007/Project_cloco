// pages/profile.js
"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.interceptors = [];
      axios.interceptors.push({
        request: (config) => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
      });
      axios.get('http://localhost:8000/api/users/profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      axios.get('http://localhost:8000/api/jobs/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          setJobs(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div>
      {user && (
        <div>
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </div>
      )}
      {jobs && (
        <div>
          <h1>Jobs</h1>
          <ul>
            {jobs.map(job => (
              <li key={job.id}>{job.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
