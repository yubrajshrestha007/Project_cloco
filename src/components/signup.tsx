"use client";
import React, { useState } from "react";
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

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // State to hold validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    let valid = true;
    let newErrors: { name?: string; email?: string; password?: string } = {};

    // Validate Name
    if (!name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    // Validate Email
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }

    // Validate Password
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);

    // If valid, proceed with form submission (e.g., API call)
    if (valid) {
      console.log("Form submitted:", { name, email, password });
      // ...submit data or perform further actions
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 min-h-screen justify-center items-center",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md bg-green-100 text-black shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">
            Welcome to Job Portal
          </CardTitle>
          <CardDescription className="text-center">
            Signup to explore and manage Jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Name Field */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  required
                  className="bg-white text-black border-gray-300"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-white text-black border-gray-300"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              {/* Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-white text-black border-gray-300 focus:border-green-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-green-500 text-white hover:bg-green-600"
              >
                Signup
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
