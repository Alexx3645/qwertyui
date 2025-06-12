"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Target, RefreshCw } from "lucide-react"

interface Module {
  id: string
  title: string
  description: string
  duration: string
  topics: string[]
}

interface Course {
  id: string
  title: string
  description: string
  totalDuration: string
  difficulty: string
  topic: string
  modules: Module[]
}

export default function CoursePreviewPage() {
  const [course, setCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedCourse = sessionStorage.getItem("generatedCourse")
    if (storedCourse) {
      setCourse(JSON.parse(storedCourse))
    }
    setIsLoading(false)
  }, [])

  const handleRegenerate = () => {
    router.push("/builder")
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="space-y-3">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Button onClick={() => router.push("/builder")}>Create New Course</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-6 w-6 text-black" />
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            AI Generated 🔒
          </Badge>
        </div>
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-600 mb-4">{course.description}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.totalDuration}
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            {course.difficulty}
          </div>
          <div className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            Focus: {course.topic}
          </div>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {course.modules.map((module, index) => (
          <Card key={module.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {module.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{module.description}</CardDescription>
                </div>
                <Badge variant="outline">{module.duration}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-700">Topics covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {module.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> This course is AI-generated and focuses entirely on {course.topic}. The course cannot
          be edited manually.
        </p>
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={handleRegenerate} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Create New Course
        </Button>
      </div>
    </div>
  )
}
