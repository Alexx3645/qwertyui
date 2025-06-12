import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory user storage for demo
const users: Array<{ id: string; name: string; email: string; password: string }> = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Create user (in production, hash the password)
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, hash this
    }

    users.push(newUser)

    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
