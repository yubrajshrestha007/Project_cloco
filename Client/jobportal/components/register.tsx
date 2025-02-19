"use client";
import React, { useState } from "react";
// import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';


export default function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "",address:'', is_employer: false });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string ; address?: string }>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setServerError("");
    let valid = true;
    const newErrors: { name?: string; email?: string; password?: string } = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }

    // Validate Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/users/register/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: formData.name,
    email: formData.email,
    password: formData.password,
    Address:formData.address,
    is_employer: formData.is_employer,
  }),
});
// const data=await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        // console.log('User created:', data);
        router.push('/login');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setServerError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={cn("flex flex-col gap-6 min-h-screen justify-center items-center", className)} {...props}>
      <Card className="w-full max-w-md bg-green-100 text-black shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">Welcome to Job Portal</CardTitle>
          <CardDescription className="text-center">Signup to explore and manage Jobs</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" type="text" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} className="bg-white text-black border-gray-300" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className="bg-white text-black border-gray-300" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
                <Input id="email" name="address" type="text" placeholder="" value={formData.address} onChange={handleChange} className="bg-white text-black border-gray-300" />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Enter Your Password" value={formData.password} onChange={handleChange} className="bg-white text-black border-gray-300 focus:border-green-500" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
              <Button type="submit" className="w-full bg-green-500 text-white hover:bg-green-600" disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
