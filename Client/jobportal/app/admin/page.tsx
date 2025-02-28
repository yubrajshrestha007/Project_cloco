// 'use client'
// import DashboardChart from '@/components/admin/chart'
// import SidebarComponent from '@/components/admin/sidebar'
// import NavBar from '@/components/header/header'
// import axios from 'axios'
// import { useEffect, useState } from 'react'

// const page = () => {
//     const [usersCount, setUsersCount] = useState<Number>(0);
//     const [jobsCount, setJobsCount] = useState(0);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const token = localStorage.getItem("access");
//                 const headers = {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 };

//                 const jobsResponse = await axios.get("http://localhost:8000/api/jobs/jobs/", 
//                 { headers, withCredentials: true });
//                 if (jobsResponse.status === 200) {
//                     setJobsCount(jobsResponse.data.length);
//                 }
//                 const usersResponse = await axios.get("http://localhost:8000/api/users/users/", 
//                 { headers, withCredentials: true });
//                 if (usersResponse.status === 200) {
//                     setUsersCount(usersResponse.data.length);
//                 }
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         fetchData();
//     }, []);
//     return (
        
//         <div className='container mx-auto py-8'>
//             <NavBar />
//             <div className='container p-4 flex items-center justify-center'>
//             <DashboardChart  users={usersCount} jobs={jobsCount} />
//         </div>
//             <SidebarComponent />
//         </div>
//     )
// }

// export default page
'use client';
import { useState, useEffect } from "react";
import { Job } from "@/interface";
import JobForm from "@/components/admin/JobForm";
import JobList from "@/components/admin/JobList";
import useAuth from "@/hooks/useAuth";
import { fetchJobs, createJob, updateJob, deleteJob, fetchUserProfile } from "@/services/jobService";
import NavBar from "@/components/header/header";
import { Divide, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminJobs() {
  const { isAuthenticated, loading } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<{ [key: number]: { id: number; username: string } | null }>({});
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  
  const emptyJob: Omit<Job, 'posted_by' | 'posted_at'> = {
    id: 0,
    title: "",
    company: "",
    description: "",
    location: "",
    salary: 0,
    category: "",
  };
  
  const [currentJob, setCurrentJob] = useState<Omit<Job, 'posted_by' | 'posted_at'>>(emptyJob);

  // Fetch jobs on component mount
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const loadJobs = async () => {
      try {
        const jobsData = await fetchJobs();
        setJobs(jobsData);
        setError(null);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again.");
      }
    };
    
    loadJobs();
  }, [isAuthenticated]);

  // Fetch user data for jobs
  useEffect(() => {
    if (jobs.length === 0) return;

    const fetchUsers = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setUsers({ [userProfile.id]: userProfile });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    
    fetchUsers();
  }, [jobs]);

  const handleEdit = (job: Job) => {
    setCurrentJob({
      id: job.id,
      title: job.title,
      company: job.company,
      description: job.description,
      location: job.location,
      salary: job.salary,
      category: job.category,
    });
    setEditingJobId(job.id);
  };

  const handleSubmit = async (job: Omit<Job, 'posted_by' | 'posted_at'>) => {
    try {
      if (editingJobId !== null) {
        const updatedJob = await updateJob(editingJobId, job);
        setJobs(jobs.map(j => (j.id === editingJobId ? updatedJob : j)));
        setEditingJobId(null);
        toast.success("Edited successfully")
      } else {
        const newJob = await createJob(job);
        toast.success("Added successfully")
        setJobs([...jobs, newJob]);
      }    
      // Reset form
      setCurrentJob(emptyJob);
      setError(null);
    } catch (error) {
      toast.error("Error while editing")
      setError("Failed to save job. Please try again.");
      throw error; 
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter(job => job.id !== id));
      confirm("Are you sure you want to delete job?")
      toast.success("Deleted successfully")
      setError(null);
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job")
      setError("Failed to delete job. Please try again.");
    }
  };
  if (loading)
    return (
      <div className="flex flex-col m-12 items-center justify-center p-8 ">
        <Loader2 size={80} className="h-12 w-12  text-gray-900 animate-spin" />
        <p className="text-gray-700 mt-3">Loading, please wait...</p>
      </div>
    );
  
  if (!isAuthenticated) return <p className="flex items-center m-20 justify-center text-2xl">You are not authorized to view this page.</p>;

  return (
      <div className="container mx-auto py-8">
        <NavBar/>
      <h1 className="text-3xl font-bold mb-6">Admin Job Management</h1>
      {error && <p className="text-red-500">{error}</p>}

      <JobForm 
        initialJob={currentJob} 
        onSubmit={handleSubmit} 
        isEditing={editingJobId !== null} 
      />
      
      <JobList 
        jobs={jobs} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
        users={users} 
      />
    </div>
  );
}