"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const popularTopics = [
  "React Development",
  "Python Programming",
  "Digital Marketing",
  "Graphic Design",
  "Data Analysis",
  "Photography",
  "JavaScript",
  "Machine Learning",
  "UI/UX Design",
  "Content Writing",
  "Excel Mastery",
  "SEO Optimization",
]

interface TopicStepProps {
  topic: string
  onUpdate: (topic: string) => void
}

export function TopicStep({ topic, onUpdate }: TopicStepProps) {
  const [customTopic, setCustomTopic] = useState("")

  const selectTopic = (selectedTopic: string) => {
    onUpdate(selectedTopic)
    setCustomTopic("")
  }

  const handleCustomTopicChange = (value: string) => {
    setCustomTopic(value)
    onUpdate(value)
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-600 mb-4">
          Choose one specific topic you want to master. Our AI will create a focused course that covers everything you
          need to know about this subject.
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-3">Popular Topics</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {popularTopics.map((popularTopic) => (
            <Button
              key={popularTopic}
              variant={topic === popularTopic ? "default" : "outline"}
              size="sm"
              onClick={() => selectTopic(popularTopic)}
              className="text-left justify-start"
            >
              {popularTopic}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="custom-topic" className="text-base font-medium">
          Or enter your own topic
        </Label>
        <Input
          id="custom-topic"
          placeholder="e.g., Advanced Excel Formulas, Portrait Photography, etc."
          value={customTopic}
          onChange={(e) => handleCustomTopicChange(e.target.value)}
          className="mt-2"
        />
      </div>

      {topic && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Selected Topic:</h4>
          <p className="text-gray-800 font-medium">{topic}</p>
        </div>
      )}
    </div>
  )
}
