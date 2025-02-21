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
    username: String;
    email: String;
  }
}

export interface User {
  username: String;
  email: String;
  address: String;
}
