"use client"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const skillLevels = [
  {
    id: "beginner",
    title: "Beginner",
    description: "I'm new to this topic and want to start from the basics",
    icon: "🌱",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "I have some knowledge and want to build upon it",
    icon: "🌿",
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "I'm experienced and want to master advanced concepts",
    icon: "🌳",
  },
]

interface SkillLevelStepProps {
  skillLevel: string
  onUpdate: (level: string) => void
}

export function SkillLevelStep({ skillLevel, onUpdate }: SkillLevelStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-gray-600 mb-6">
        Select your current skill level to help us tailor the course content appropriately.
      </p>

      <div className="grid gap-4">
        {skillLevels.map((level) => (
          <Card
            key={level.id}
            className={`cursor-pointer transition-all ${
              skillLevel === level.id ? "ring-2 ring-black bg-gray-50" : "hover:bg-gray-50"
            }`}
            onClick={() => onUpdate(level.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <span className="text-2xl">{level.icon}</span>
                {level.title}
              </CardTitle>
              <CardDescription>{level.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
