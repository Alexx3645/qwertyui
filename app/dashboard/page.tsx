"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Brain, Clock, Target, Plus, Eye, RefreshCw, Trash2 } from "lucide-react"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string
  totalDuration: string
  difficulty: string
  status: "not-started" | "in-progress" | "completed"
  createdAt: string
  progress?: number
}

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in")
      return
    }

    if (status === "authenticated") {
      fetchCourses()
    }
  }, [status, router])

  const fetchCourses = async () => {
    try {
      // Mock data for demo - replace with your own data fetching
      const mockCourses: Course[] = [
        {
          id: "1",
          title: "Complete React Development Course",
          description: "A comprehensive course focused on React Development. Tailored to your beginner level.",
          totalDuration: "8 weeks",
          difficulty: "beginner",
          status: "in-progress",
          createdAt: "2024-01-15",
          progress: 35,
        },
        {
          id: "2",
          title: "Complete Python Programming Course",
          description: "A comprehensive course focused on Python Programming. Tailored to your intermediate level.",
          totalDuration: "6 weeks",
          difficulty: "intermediate",
          status: "not-started",
          createdAt: "2024-01-10",
        },
      ]

      setCourses(mockCourses)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (courseId: string) => {
    try {
      // Replace with your own delete logic
      setCourses(courses.filter((course) => course.id !== courseId))
      toast({
        title: "Success",
        description: "Course deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "not-started":
        return "bg-gray-100 text-gray-800"
      case "in-progress":
        return "bg-gray-100 text-gray-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: Course["status"]) => {
    switch (status) {
      case "not-started":
        return "Not Started"
      case "in-progress":
        return "In Progress"
      case "completed":
        return "Completed"
      default:
        return "Unknown"
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-gray-600">Manage your AI-generated learning paths</p>
        </div>
        <Button asChild>
          <Link href="/builder">
            <Plus className="h-4 w-4 mr-2" />
            Create New Course
          </Link>
        </Button>
      </div>

      {courses.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No courses yet</h2>
            <p className="text-gray-600 mb-6">Create your first AI-generated course to get started</p>
            <Button asChild>
              <Link href="/builder">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Course
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    <Brain className="h-3 w-3 mr-1" />
                    AI Generated
                  </Badge>
                  <Badge className={getStatusColor(course.status)}>{getStatusText(course.status)}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <CardDescription className="line-clamp-3">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.totalDuration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {course.difficulty}
                  </div>
                </div>

                {course.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-black h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="mt-auto space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Regenerate
                    </Button>
                  </div>
                  <Button variant="destructive" size="sm" className="w-full" onClick={() => handleDelete(course.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
