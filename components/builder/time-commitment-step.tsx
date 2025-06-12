"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Clock } from "lucide-react"

const timeOptions = [
  { hours: 2, label: "2 hours", description: "Light commitment, perfect for busy schedules" },
  { hours: 5, label: "5 hours", description: "Moderate pace with steady progress" },
  { hours: 10, label: "10 hours", description: "Intensive learning for faster results" },
  { hours: 15, label: "15+ hours", description: "Maximum commitment for rapid mastery" },
]

interface TimeCommitmentStepProps {
  timePerWeek: number
  onUpdate: (time: number) => void
}

export function TimeCommitmentStep({ timePerWeek, onUpdate }: TimeCommitmentStepProps) {
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        How much time can you dedicate to learning each week? This helps us structure your course appropriately.
      </p>

      <div className="grid gap-4">
        {timeOptions.map((option) => (
          <Card
            key={option.hours}
            className={`cursor-pointer transition-all ${
              timePerWeek === option.hours ? "ring-2 ring-black bg-gray-50" : "hover:bg-gray-50"
            }`}
            onClick={() => onUpdate(option.hours)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Clock className="h-5 w-5 text-black" />
                {option.label} per week
              </CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-4">Or set a custom amount:</h3>
        <div className="space-y-4">
          <Slider
            value={[timePerWeek || 5]}
            onValueChange={(value) => onUpdate(value[0])}
            max={20}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="text-center">
            <span className="text-lg font-medium">{timePerWeek || 5} hours per week</span>
          </div>
        </div>
      </div>
    </div>
  )
}
