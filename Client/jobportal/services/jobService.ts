'use client';
import axios from "axios";
import { Job } from "@/interface";

const API_URL = "http://localhost:8000/api";

export const fetchJobs = async () => {
  const token = localStorage.getItem('access');
  if (!token) throw new Error("No authentication token found");

  const response = await axios.get(`${API_URL}/jobs/admin/jobs/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return response.data;
};

export const createJob = async (jobData: Omit<Job, 'posted_by' | 'posted_at' | 'id'>) => {
  const token = localStorage.getItem('access');
  if (!token) throw new Error("No authentication token found");

  // Get current user ID
  const userResponse = await axios.get(`${API_URL}/users/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  const userId = userResponse.data.id;
  
  const response = await axios.post(`${API_URL}/jobs/admin/jobs/`, {
    ...jobData,
    posted_by_id: userId,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return response.data;
};

export const updateJob = async (id: number, jobData: Omit<Job, 'posted_by' | 'posted_at' | 'id'>) => {
  const token = localStorage.getItem('access');
  if (!token) throw new Error("No authentication token found");

  // Get current user ID
  const userResponse = await axios.get(`${API_URL}/users/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  const userId = userResponse.data.id;
  
  const response = await axios.put(`${API_URL}/jobs/admin/jobs/${id}/update/`, {
    ...jobData,
    posted_by_id: userId,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return response.data;
};

export const deleteJob = async (id: number) => {
  const token = localStorage.getItem('access');
  if (!token) throw new Error("No authentication token found");

  await axios.delete(`${API_URL}/jobs/admin/jobs/${id}/delete/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchUserProfile = async () => {
  const token = localStorage.getItem('access');
  if (!token) throw new Error("No authentication token found");

  const response = await axios.get(`${API_URL}/users/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return response.data;
};
