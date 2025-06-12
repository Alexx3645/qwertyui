import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Clock, Target, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Build Your Own <span className="text-black">AI-Generated</span> Course Plan
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create personalized learning paths powered by AI. Your course is built entirely by artificial intelligence and
          focuses on one specific topic tailored to your skill level and schedule.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/builder">Start Building</Link>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardContent className="p-6 text-center">
            <Brain className="h-12 w-12 text-black mx-auto mb-4" />
            <h3 className="font-semibold mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600">Courses generated entirely by advanced AI algorithms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-gray-800 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Focused Learning</h3>
            <p className="text-sm text-gray-600">Each course teaches one specific topic in depth</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-12 w-12 text-gray-700 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Time-Optimized</h3>
            <p className="text-sm text-gray-600">Fits your schedule and available time commitment</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="h-12 w-12 text-gray-900 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Instant</h3>
            <p className="text-sm text-gray-600">Get your complete course plan in seconds</p>
          </CardContent>
        </Card>
      </div>

      {/* How it works */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-black">1</span>
            </div>
            <h3 className="font-semibold mb-2">Choose Your Topic</h3>
            <p className="text-gray-600">Select one specific topic you want to master</p>
          </div>
          <div>
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-gray-800">2</span>
            </div>
            <h3 className="font-semibold mb-2">AI Creates Your Course</h3>
            <p className="text-gray-600">Our AI generates a focused learning path for that topic</p>
          </div>
          <div>
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-gray-900">3</span>
            </div>
            <h3 className="font-semibold mb-2">Start Learning</h3>
            <p className="text-gray-600">Follow your custom course and master the topic</p>
          </div>
        </div>
      </div>
    </div>
  )
}
