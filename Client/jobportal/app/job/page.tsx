'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/custom/navigation/header";

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
        <a href="/login">login</a>
      </div>
    );
  }

  return (
  <div className="container mx-auto py-8">
    <NavBar />
    <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
    <input type="search" value={searchQuery} onChange={handleSearchChange} placeholder="Search jobs" className="w-full mb-4" />
    <select value={selectedCategory} onChange={handleCategoryChange} className="mb-4">
      <option value="">All Categories</option>
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredJobs.length > 0 ? (
        filteredJobs.map(job => (
          <Card key={job.id} className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <div>{job.title}</div>
                <Badge variant="outline" className="ml-2">{job.location}</Badge>
              </CardTitle>
              <CardDescription>{job.company}</CardDescription>
            </CardHeader>
            {/* <CardContent className="flex-grow">
              <p className="text-sm text-gray-600">{job.description}</p>
            </CardContent> */}
            <CardFooter className="flex justify-between items-center pt-4 border-t">
              <p className="font-medium">{job.salary ? `$${job.salary.toLocaleString()}` : 'Salary not specified'}</p>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/900 transition-colors">
                Apply Now
              </button>
              <Badge variant="outline" className="ml-2">{job.posted_by.username}</Badge>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No job listings found.</p>
      )}
    </div>
  </div>
);
}
