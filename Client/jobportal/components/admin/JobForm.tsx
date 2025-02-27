'use client';
import { useState, useEffect } from "react";
import { Job } from "@/interface";

interface JobFormProps {
  initialJob: Omit<Job, 'posted_by' | 'posted_at'>;
  onSubmit: (job: Omit<Job, 'posted_by' | 'posted_at'>) => Promise<void>;
  isEditing: boolean;
}

export default function JobForm({ initialJob, onSubmit, isEditing }: JobFormProps) {
  const [job, setJob] = useState(initialJob);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setJob(initialJob);
  }, [initialJob]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!job.title || !job.salary) {
      setError("Title and Salary are required fields.");
      return;
    }
    
    try {
      await onSubmit(job);
      setError(null);
    } catch (error) {
      console.error("Error in form submission:", error);
      setError("Failed to submit job. Please try again.");
    }
  };

  return (
    <div className="mb-6 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-3">{isEditing ? "Edit Job" : "Add New Job"}</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      <input name="title" placeholder="Job Title" value={job.title} onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input name="company" placeholder="Company" value={job.company} onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <textarea name="description" placeholder="Job Description" value={job.description} onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <select name="category" value={job.category} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
        <option value="">Select Category</option>
        <option value="Software Development">Software Development</option>
        <option value="Data Science">Data Science</option>
        <option value="Product Management">Product Management</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="Other">Other</option>
      </select>
      <input name="location" placeholder="Location" value={job.location} onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <input name="salary" type="number" placeholder="Salary" value={job.salary} onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">{isEditing ? "Update Job" : "Add Job"}</button>
    </div>
  );
}
