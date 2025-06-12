"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TopicStep } from "@/components/builder/topic-step"
import { SkillLevelStep } from "@/components/builder/skill-level-step"
import { TimeCommitmentStep } from "@/components/builder/time-commitment-step"
import { GoalsStep } from "@/components/builder/goals-step"
import { CoursePreview } from "@/components/builder/course-preview"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface CourseData {
  topic: string
  skillLevel: string
  timePerWeek: number
  goals: string
}

const steps = [
  { id: 1, title: "Topic", description: "What specific topic do you want to learn?" },
  { id: 2, title: "Skill Level", description: "What's your current level?" },
  { id: 3, title: "Time Commitment", description: "How much time can you dedicate?" },
  { id: 4, title: "Goals", description: "What do you want to achieve?" },
]

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [courseData, setCourseData] = useState<CourseData>({
    topic: "",
    skillLevel: "",
    timePerWeek: 0,
    goals: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const progress = (currentStep / steps.length) * 100

  const updateCourseData = (field: keyof CourseData, value: any) => {
    setCourseData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      generateCourse()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateCourse = async () => {
    setIsGenerating(true)

    // Simulate course generation
    setTimeout(() => {
      const course = {
        id: Date.now().toString(),
        title: `Complete ${courseData.topic} Course`,
        description: `A comprehensive course focused on ${courseData.topic}. Tailored to your ${courseData.skillLevel} level.`,
        totalDuration: `${Math.ceil(30 / courseData.timePerWeek)} weeks`,
        difficulty: courseData.skillLevel,
        topic: courseData.topic,
        modules: [
          {
            id: "1",
            title: `${courseData.topic} Fundamentals`,
            description: `Learn the core concepts of ${courseData.topic}`,
            duration: "2 weeks",
            topics: [`${courseData.topic} Basics`, `${courseData.topic} Principles`, `${courseData.topic} Overview`],
          },
          {
            id: "2",
            title: `${courseData.topic} Practice`,
            description: `Apply your ${courseData.topic} knowledge`,
            duration: "2 weeks",
            topics: [`${courseData.topic} Exercises`, `${courseData.topic} Examples`, `${courseData.topic} Practice`],
          },
        ],
        createdAt: new Date().toISOString(),
      }

      sessionStorage.setItem("generatedCourse", JSON.stringify(course))
      router.push("/course/preview")
    }, 2000)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return courseData.topic.trim() !== ""
      case 2:
        return courseData.skillLevel !== ""
      case 3:
        return courseData.timePerWeek > 0
      case 4:
        return courseData.goals.trim() !== ""
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <TopicStep topic={courseData.topic} onUpdate={(topic) => updateCourseData("topic", topic)} />
      case 2:
        return (
          <SkillLevelStep
            skillLevel={courseData.skillLevel}
            onUpdate={(level) => updateCourseData("skillLevel", level)}
          />
        )
      case 3:
        return (
          <TimeCommitmentStep
            timePerWeek={courseData.timePerWeek}
            onUpdate={(time) => updateCourseData("timePerWeek", time)}
          />
        )
      case 4:
        return <GoalsStep goals={courseData.goals} onUpdate={(goals) => updateCourseData("goals", goals)} />
      default:
        return null
    }
  }

  if (isGenerating) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-2">Generating Your Course</h2>
            <p className="text-gray-600">Creating a personalized learning path for {courseData.topic}...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Course Builder</h1>
        </div>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
              <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
            </CardHeader>
            <CardContent>{renderStep()}</CardContent>
          </Card>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={nextStep} disabled={!canProceed()}>
              {currentStep === steps.length ? "Generate Course" : "Next"}
              {currentStep < steps.length && <ChevronRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <CoursePreview courseData={courseData} />
        </div>
      </div>
    </div>
  )
}
