import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-6 w-6 text-black" />
            AI Course Builder
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/builder">
              <Button>Create Course</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
