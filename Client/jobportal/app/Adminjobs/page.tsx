'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { Job } from "@/interface";

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [newJob, setNewJob] = useState<Omit<Job, 'posted_by' | 'posted_at'>>({
    id: 0,
    title: "",
    company: "",
    description: "",
    location: "",
    salary: 0,
    category: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<{ [key: number]: { id: number; username: string } | null }>({});
  const [editingJobId, setEditingJobId] = useState<number | null>(null); // State for editing job

  useEffect(() => {
    const token = localStorage.getItem('access');

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    axios.get("http://localhost:8000/api/jobs/admin/jobs/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      setIsAuthenticated(true);
      setJobs(response.data);
      setError(null);
    })
    .catch(error => {
      console.error("Error fetching jobs:", error.response ? error.response.data : error);
      setError("Failed to fetch jobs. Please try again.");
      setIsAuthenticated(false);
    })
    .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (jobs.length === 0) return;

    const fetchUsers = async () => {
      const uniqueUserIds = Array.from(new Set(jobs.map(job => job.posted_by)));
      try {
        const userResponses = await Promise.all(uniqueUserIds.map(id => fetchUser(id)));
        const usersData = Object.fromEntries(userResponses.filter(user => user !== null).map(user => [user!.id, user!]));
        console.log(usersData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [jobs]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('access')}`, // Add Authorization header
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null; // Return null on error
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('access');
    if (!token) return;

    if (!newJob.title || !newJob.salary) {
      setError("Title and Salary are required fields.");
      return;
    }

    try {
      const userResponse = await axios.get("http://localhost:8000/api/users/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = userResponse.data.id;

      const jobData = {
        title: newJob.title,
        company: newJob.company,
        description: newJob.description,
        location: newJob.location,
        salary: newJob.salary,
        category: newJob.category,
        posted_by_id: userId,
      };

      let response;

      // Check if we are editing an existing job
      if (editingJobId !== null) {
        response = await axios.put(`http://localhost:8000/api/jobs/admin/jobs/${editingJobId}/update/`, jobData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingJobId(null); // Clear editing job ID after update
      } else {
        response = await axios.post("http://localhost:8000/api/jobs/admin/jobs/", jobData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setJobs(editingJobId !== null
        ? jobs.map(job => (job.id === editingJobId ? response.data : job))
        : [...jobs, response.data]
      );

      // Reset newJob state
      setNewJob({
        id: 0,
        title: "",
        company: "",
        description: "",
        location: "",
        salary: 0,
        category: "",
      });
      setError(null);
    } catch (error) {
      console.error("Error adding/updating job:", error);
      setError("Failed to add/update job. Please try again.");
    }
  };

  const handleEdit = (job: Job) => {
    setNewJob({
      id: job.id,
      title: job.title,
      company: job.company,
      description: job.description,
      location: job.location,
      salary: job.salary,
      category: job.category,
    });
    setEditingJobId(job.id); // Set the job ID we are editing
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('access');
    if (!token) return;

    try {
      await axios.delete(`http://localhost:8000/api/jobs/admin/jobs/${id}/delete/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
      setError("Failed to delete job. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>You are not authorized to view this page.</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Job Management</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Add/Edit Job Form */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-3">{editingJobId ? "Edit Job" : "Add New Job"}</h2>
        <input name="title" placeholder="Job Title" value={newJob.title} onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
        <input name="company" placeholder="Company" value={newJob.company} onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
        <textarea name="description" placeholder="Job Description" value={newJob.description} onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
        <select name="category" value={newJob.category} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
          <option value="">Select Category</option>
          <option value="Software Development">Software Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Product Management">Product Management</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Other">Other</option>
        </select>
        <input name="location" placeholder="Location" value={newJob.location} onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
        <input name="salary" type="number" placeholder="Salary" value={newJob.salary} onChange={handleChange} className="w-full mb-2 p-2 border rounded"/>
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">{editingJobId ? "Update Job" : "Add Job"}</button>
      </div>

      {/* Job List */}
      <h2 className="text-xl font-semibold mb-3">Job Listings</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.id} className="p-4 border mb-2 flex justify-between">
            {job.title} ({job.category}) - Posted by: {job.posted_by?.username}
            <div>
              <button onClick={() => handleEdit(job)} className="px-3 py-1 bg-yellow-500 text-white rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(job.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
