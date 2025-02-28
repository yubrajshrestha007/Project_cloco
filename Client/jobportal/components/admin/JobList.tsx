'use client';

import { Job } from "@/interface";
import { Card, CardContent, CardFooter } from "../ui/card";

interface JobListProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
  users: { [key: number]: { id: number; username: string } | null };
}

export default function JobList({ jobs, onEdit, onDelete, users }: JobListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Job Listings</h2>
      
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map(job => (
            <Card key={job.id} className="flex flex-col">
              <CardContent className="p-4 dark:bg-yellow-100">
                <div className="font-medium dark:text-black">
                  {job.title} <span className="text-black">({job.category})</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Posted by: {job.posted_by.username}
                  {/* {users?.[job.posted_by]?.username || 'Unknown'} */}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end gap-2 pt-0 dark:bg-yellow-100">
                <button 
                  onClick={() => onEdit(job)} 
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(job.id)} 
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}