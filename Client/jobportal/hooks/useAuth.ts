'use client';
import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access');

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    // Verify token validity
    axios.get("http://localhost:8000/api/jobs/admin/jobs/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      setIsAuthenticated(true);
    })
    .catch(() => {
      setIsAuthenticated(false);
    })
    .finally(() => setLoading(false));
  }, []);

  return { isAuthenticated, loading };
}
