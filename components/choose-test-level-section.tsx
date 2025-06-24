"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Question {
  id: string
  name: string
  price: number
}

const sampleQuestionsData: Question[] = [
  { id: "easy", name: "Easy Test", price: 0 },
  { id: "medium", name: "Medium Test", price: 5 },
  { id: "hard", name: "Hard Test", price: 10 },
  { id: "expert", name: "Expert Test", price: 15 },
]

const ChooseTestLevelSection: React.FC = () => {
  const router = useRouter()
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleStartTestClick = (question: Question) => {
    setSelectedQuestion(question)
    if (question.price > 0) {
      setIsModalOpen(true)
    } else {
      router.push(`/quiz/${question.id}`)
    }
  }

  const handlePaymentSuccess = () => {
    setIsModalOpen(false)
    if (selectedQuestion) {
      router.push(`/quiz/${selectedQuestion.id}`)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Test Level</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleQuestionsData.map((question) => (
          <div
            key={question.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{question.name}</h3>
              <p className="text-gray-600 mb-4">Price: ${question.price}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleStartTestClick(question)}
              >
                Start Test
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {isModalOpen && selectedQuestion && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Payment Required
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">This test requires a payment of ${selectedQuestion.price}.</p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handlePaymentSuccess}
                >
                  Pay Now
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChooseTestLevelSection
