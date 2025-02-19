'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Job } from "../../interface";
import NavBar from "@/components/custom/navigation/header";


export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);


  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8000/api/jobs/jobs")
      .then(response => {
        setJobs(response.data);
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

  return (
    <div className="container mx-auto py-8">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
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
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/900 transition-colors">
                Apply Now
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {jobs.length === 0 && <p>No job listings found.</p>}
    </div>
  );
}
