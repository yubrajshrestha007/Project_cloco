'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from'../../hooks/useAuth';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/jobs/jobs/",
{
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('access')}` },
          withCredentials: true, // Ensures cookies are sent
        }
    )
      .then(response => {
        if(response.status === 200){
            setIsAuthenticated(true)
        }
        setJobs(response.data);
        const categories = Array.from(new Set(response.data.map(job => job.category)));
        setCategories(categories);
      })
      .catch(error => console.log(error));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchJobs = (jobs, searchQuery, selectedCategory) => {
    if (selectedCategory === '') {
      return jobs.filter(job => {
        return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
               job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
               job.location.toLowerCase().includes(searchQuery.toLowerCase());
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

  const filteredJobs = searchJobs(jobs, searchQuery, selectedCategory);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold">You are not authenticated</h1>
        <p>Please login to access the job listings</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Job Listings</h1>
      <input type="search" value={searchQuery} onChange={handleSearchChange} placeholder="Search jobs" />
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {filteredJobs.length > 0 ? (
        filteredJobs.map(job => (
          <div key={job.id} className="border p-4 my-2">
            <h1>
              {job.title}
            </h1>
            <h2 className="text-xl">{job.title} - {job.company}</h2>
            <p>desc:{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
}
