"use client"

import { useRouter } from "next/navigation"

const PremiumPage = () => {
  const router = useRouter()

  const handleLevelClick = (level: string) => {
    router.push(`/premium-quiz/${level}`)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Premium Quizzes</h1>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleLevelClick("easy")}
        >
          Easy
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleLevelClick("medium")}
        >
          Medium
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleLevelClick("hard")}
        >
          Hard
        </button>
      </div>
    </div>
  )
}

export default PremiumPage
