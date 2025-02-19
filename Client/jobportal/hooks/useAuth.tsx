import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/check')
      .then(response => {
        setIsAuthenticated(response.data.isAuthenticated);
      })
      .catch(error => {
        console.log(error);
        setIsAuthenticated(false);
      });
  }, []);

  return isAuthenticated;
};

export default useAuth;
