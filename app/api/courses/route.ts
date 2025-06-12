import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory course storage for demo
const courses: Array<any> = []

export async function POST(request: NextRequest) {
  try {
    const course = await request.json()

    // Add course to storage - replace with your own storage logic
    const savedCourse = {
      ...course,
      userId: "demo-user", // In production, get from session
      status: "not-started",
      savedAt: new Date().toISOString(),
    }

    courses.push(savedCourse)

    return NextResponse.json(savedCourse, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save course" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Return user courses - replace with your own logic
    const userCourses = courses.filter((course) => course.userId === "demo-user")
    return NextResponse.json(userCourses)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}
