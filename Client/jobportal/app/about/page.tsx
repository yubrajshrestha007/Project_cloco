'use client'
import NavBar from "@/components/header/header";

export default function About() {
  return (
    <div className="container mx-auto py-8">
      <NavBar />
      <section className="text-center py-16">
        <h1 className="text-4xl font-black  mb-4">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Welcome to <span className="font-bold text-yellow-500">JobPortal</span>, your trusted platform for finding the perfect job opportunities.
          Our mission is to connect job seekers with top employers, making job hunting simple and efficient.
        </p>
      </section>



      <section className="py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6  shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold">Trusted Employers</h3>
              <p className=" mt-2">We partner with reputable companies to bring you the best job offers.</p>
            </div>
            <div className="p-6  shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold">AI-Powered Search</h3>
              <p className=" mt-2">Find jobs that match your skills with our intelligent filtering system.</p>
            </div>
            <div className="p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold">Easy Application</h3>
              <p className=" mt-2">Apply to jobs with just one click and track your application progress.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-yellow-500 text-white py-12 text-center rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg">Have questions? Contact us at <a href="mailto:support@jobportal.com" className="underline">support@jobportal.com</a></p>
      </section>
    </div>
  );
}
