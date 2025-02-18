'use client'
import React, { useState } from 'react';

interface Job {
  title: string;
  description: string;
  location: string;
  company: string;
  salary: string;
  posted_by: string;
}

const JobPostingForm = () => {
  const [job, setJob] = useState<Job>({
    title: '',
    description: '',
    location: '',
    company: '',
    salary: '',
    posted_by: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('http://localhost:8000/api/jobs/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Title:
        <input type="text" name="title" value={job.title} onChange={handleChange} />
      </label>
      <label>
        Job Description:
        <textarea name="description" value={job.description} onChange={handleChange} />
      </label>
      <label>
        Job Location:
        <input type="text" name="location" value={job.location} onChange={handleChange} />
      </label>
      <label>
        Company:
        <input type="text" name="company" value={job.company} onChange={handleChange} />
      </label>
      <label>
        Salary:
        <input type="text" name="salary" value={job.salary} onChange={handleChange} />
      </label>
      <label>
        Posted By:
        <input type="text" name="posted_by" value={job.posted_by} onChange={handleChange} />
      </label>
      <button type="submit">Post Job</button>
    </form>
  );
};

export default JobPostingForm;
