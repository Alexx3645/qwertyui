"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const goalSuggestions = [
  "Get a new job in this field",
  "Start a side project or business",
  "Improve my current job performance",
  "Learn for personal interest",
  "Prepare for certification",
  "Switch career paths",
]

interface GoalsStepProps {
  goals: string
  onUpdate: (goals: string) => void
}

export function GoalsStep({ goals, onUpdate }: GoalsStepProps) {
  const addSuggestion = (suggestion: string) => {
    if (!goals.includes(suggestion)) {
      const newGoals = goals ? `${goals}\n${suggestion}` : suggestion
      onUpdate(newGoals)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-600 mb-4">
          What do you want to achieve with this course? Be specific about your goals to help us create the most relevant
          content.
        </p>

        <Textarea
          placeholder="Describe your learning goals and what you want to achieve..."
          value={goals}
          onChange={(e) => onUpdate(e.target.value)}
          rows={4}
          className="resize-none"
        />
      </div>

      <div>
        <h3 className="font-medium mb-3">Common Goals (click to add)</h3>
        <div className="flex flex-wrap gap-2">
          {goalSuggestions.map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => addSuggestion(suggestion)}
              className="text-sm"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>

      {goals && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Your Goals:</h4>
          <p className="text-blue-800 text-sm whitespace-pre-line">{goals}</p>
        </div>
      )}
    </div>
  )
}
