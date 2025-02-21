import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/interface/index"
interface CardProps {
    filteredJobs: Job[];
    handleView: (id:number) => void;
}

const CardSection = ({filteredJobs, handleView}: CardProps) => {
    console.log(filteredJobs)
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {filteredJobs.length > 0 ? (
    filteredJobs.map(job => (
      <Card key={job.id} className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="flex justify-between items-start">
            <div>{job.title}</div>
            <Badge variant="outline" className="ml-2">{job.location}</Badge>
          </CardTitle>
          <CardDescription>{job.company}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600">{job.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-4 border-t">
          <p className="font-medium">{job.salary ? `$${job.salary.toLocaleString()}` : 'Salary not specified'}</p>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/900 transition-colors"
            onClick={() => handleView(job.id)}
          >
            View Details
          </button>
        </CardFooter>
      </Card>
    ))
  ) : (
    <p className="text-center text-lg text-gray-500 col-span-full">No job listings found matching your search.</p>
  )}
</div>

  )
}

export default CardSection