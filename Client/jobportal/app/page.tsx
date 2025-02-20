'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Job } from "../interface";
import NavBar from "@/components/custom/navigation/header";
import HeroSection from "@/components/heroSection";
import Model from "@/components/model";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModel, setshowModel] = useState(false);
  const [viewData, setViewData] = useState<Job>();

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8000/api/jobs/jobs")
      .then(response => {
        setJobs(response.data);
        const categories = Array.from(new Set(response.data.map(job => job.category)));
        setCategories(categories);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError("Failed to fetch job listings");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
        <p>Loading job listings...</p>
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

  const handleView = (id: number) => {
    setshowModel(true)
    console.log(id)
    const foundJob = jobs.find((job) => job.id === id)
    console.log(foundJob)
    setViewData(foundJob)
  }

  const filteredJobs = searchJobs(jobs, searchQuery, selectedCategory)
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map(job => (
          <Card key={job.id} className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <div>{job.title}</div>
                <Badge variant="outline" className="ml-2">{job.location}</Badge>
              </CardTitle>
              <CardDescription>{job.company}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600">{job.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-4 border-t">
              <p className="font-medium">{job.salary ? `$${job.salary.toLocaleString()}` : 'Salary not specified'}</p>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/900 transition-colors"
                onClick={() => handleView(job.id)}
              >
                View Details
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
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
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">No job data available.</p>
          )}
        </div>
      </Model>

    </div>
  );
}
