'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { Job } from "../interface";
import NavBar from "@/components/custom/navigation/header";
import HeroSection from "@/components/common/heroSection";
import Model from "@/components/common/model";
import { formatDistanceToNow } from 'date-fns';
import CardSection from "@/components/common/cardSection";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showModel, setshowModel] = useState(false);
  const [viewData, setViewData] = useState<Job>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading check

  useEffect(() => {
    const token = localStorage.getItem('access');

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    axios.get("http://localhost:8000/api/jobs/jobs/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      withCredentials: true,
    })
    .then(response => {
      if (response.status === 200) {
        setIsAuthenticated(true);
        setJobs(response.data);

        const categories: string[] = Array.from(new Set(response.data.map((job: Job) => job.category)));
        setCategories(categories);
      }
    })
    .catch(error => {
      console.error("Error fetching jobs:", error);
      setIsAuthenticated(false);

      if (error.response && error.response.status === 401) {
        localStorage.removeItem('access');
        window.location.href = "/login";
      }
    })
    .finally(() => {
      setLoading(false); // Mark authentication check as complete
    });
  }, []);

  // ✅ Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">You are not authenticated</h1>
          <p className="text-gray-700 mb-6">Please login to access the job listings</p>
          <a
            href="/login"
            className="inline-block px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const searchJobs = (jobs: Job[], searchQuery: string, selectedCategory: string) => {
    if (selectedCategory === '') {
      return jobs.filter(job => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
    } else {
      return jobs.filter(job => {
        return job.category === selectedCategory &&
          (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.location.toLowerCase().includes(searchQuery.toLowerCase()));
      });
    }
  };

  const handleView = (id: number) => {
    setshowModel(true);
    const foundJob = jobs.find((job) => job.id === id);
    setViewData(foundJob);
  };

  const filteredJobs = searchJobs(jobs, searchQuery, selectedCategory);

  return (
    <div className="container mx-auto py-8">
      <NavBar />
      <HeroSection searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <select value={selectedCategory} onChange={handleCategoryChange} className="mb-4">
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <CardSection filteredJobs={filteredJobs} handleView={handleView} />
      {jobs.length === 0 && <p>No job listings found.</p>}
      <Model isVisible={showModel} onClose={() => setshowModel(false)}>
        <div className="modal-content">
          {viewData ? (
            <div className="job-details p-6 m-6">
              <h3 className="text-2xl font-semibold text-primary">{viewData.title}</h3>
              <p className="text-lg "><strong>Company:</strong> {viewData.company}</p>
              <p className="text-lg "><strong>Description:</strong> {viewData.description}</p>
              <p className="text-lg "><strong>Location:</strong> {viewData.location}</p>
              <p className="text-lg "><strong>Salary:</strong> {viewData.salary}</p>
              <p className="text-lg"><strong>Posted By:</strong> {viewData.posted_by?.username}</p>
              <p className="text-lg"><strong>HR Manager contact:</strong> {viewData.posted_by?.email}</p>
              <p className="text-lg">
                <strong>Posted At:</strong> {viewData.posted_at ? formatDistanceToNow(new Date(viewData.posted_at), { addSuffix: true }) : 'N/A'}
              </p>
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">No job data available.</p>
          )}
        </div>
      </Model>
    </div>
  );
}
