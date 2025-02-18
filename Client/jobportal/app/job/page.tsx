'use client'
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/jobs/")
      .then(response => setJobs(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Job Listings</h1>
      {jobs.map(job => (
        <div key={job.id} className="border p-4 my-2">
          <h2 className="text-xl">{job.title} - {job.company}</h2>
          <p>desc:{job.description}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>

        </div>
      ))}
    </div>
  );
}
