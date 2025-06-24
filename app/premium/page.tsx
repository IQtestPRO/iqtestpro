"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

const PremiumPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [levels, setLevels] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLevels = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/premium/levels")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setLevels(data)
      } catch (error) {
        console.error("Could not fetch levels:", error)
        // Optionally set an error state to display an error message to the user
      } finally {
        setIsLoading(false)
      }
    }

    fetchLevels()
  }, [])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Premium Quizzes</h1>
      {isLoading ? (
        <div>Loading levels...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((level) => (
            <div key={level.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">{level.name}</h2>
              <p className="text-gray-700 mb-2">{level.description}</p>
              <button
                onClick={() => router.push(`/quiz/premium/${level.id}`)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PremiumPage
