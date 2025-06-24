import type React from "react"
import Link from "next/link"

interface ProfessionalTestLevelsProps {
  levels: string[]
}

const ProfessionalTestLevels: React.FC<ProfessionalTestLevelsProps> = ({ levels }) => {
  return (
    <div>
      <h2>Professional Test Levels</h2>
      <ul>
        {levels.map((level) => (
          <li key={level}>
            <Link href={`/quiz/premium/${level}`}>
              <a>{level} Quiz</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProfessionalTestLevels
