"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Target, BookOpen } from "lucide-react"
import type { CourseData } from "@/app/builder/page"

interface CoursePreviewProps {
  courseData: CourseData
}

export function CoursePreview({ courseData }: CoursePreviewProps) {
  const hasData = courseData.topic || courseData.skillLevel || courseData.timePerWeek > 0 || courseData.goals

  if (!hasData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-black" />
            Course Preview
          </CardTitle>
          <CardDescription>Your course preview will appear here as you complete the steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>Complete the form to see your course preview</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-black" />
          Course Preview
        </CardTitle>
        <CardDescription>Live preview of your AI-generated course</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {courseData.topic && (
          <div>
            <h4 className="font-medium text-sm mb-2">Topic</h4>
            <Badge variant="secondary" className="text-sm">
              {courseData.topic}
            </Badge>
          </div>
        )}

        {courseData.skillLevel && (
          <div>
            <h4 className="font-medium text-sm mb-2">Skill Level</h4>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gray-800" />
              <span className="text-sm capitalize">{courseData.skillLevel}</span>
            </div>
          </div>
        )}

        {courseData.timePerWeek > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Time Commitment</h4>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-700" />
              <span className="text-sm">{courseData.timePerWeek} hours/week</span>
            </div>
          </div>
        )}

        {courseData.goals && (
          <div>
            <h4 className="font-medium text-sm mb-2">Goals</h4>
            <p className="text-sm text-gray-600 line-clamp-3">{courseData.goals}</p>
          </div>
        )}

        <div className="pt-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            AI will generate a focused course on {courseData.topic || "your chosen topic"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
