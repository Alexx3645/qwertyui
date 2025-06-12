"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

const popularInterests = [
  "Web Development",
  "Data Science",
  "Machine Learning",
  "Digital Marketing",
  "Graphic Design",
  "Photography",
  "Business",
  "Finance",
  "Writing",
  "Languages",
  "Music",
  "Fitness",
]

interface InterestsStepProps {
  interests: string[]
  onUpdate: (interests: string[]) => void
}

export function InterestsStep({ interests, onUpdate }: InterestsStepProps) {
  const [customInterest, setCustomInterest] = useState("")

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      onUpdate(interests.filter((i) => i !== interest))
    } else {
      onUpdate([...interests, interest])
    }
  }

  const addCustomInterest = () => {
    if (customInterest.trim() && !interests.includes(customInterest.trim())) {
      onUpdate([...interests, customInterest.trim()])
      setCustomInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    onUpdate(interests.filter((i) => i !== interest))
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Popular Topics</h3>
        <div className="flex flex-wrap gap-2">
          {popularInterests.map((interest) => (
            <Button
              key={interest}
              variant={interests.includes(interest) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-3">Add Custom Topic</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Enter a topic you're interested in"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addCustomInterest()}
          />
          <Button onClick={addCustomInterest} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {interests.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Selected Topics ({interests.length})</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                {interest}
                <button onClick={() => removeInterest(interest)} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
