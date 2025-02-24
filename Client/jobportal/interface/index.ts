export interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  salary: number;
  category: string;
  posted_at: string;
  posted_by: {
    id:number;
    username: string;
    email: string;
  }
}

export interface User {
    id: number;
  username: string;
  email: string;
  address: string;
}
