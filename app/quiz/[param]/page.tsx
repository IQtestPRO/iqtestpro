import { redirect } from "next/navigation"
import PremiumQuizPage from "@/components/premium-quiz-page"
import MissionQuizPage from "@/components/mission-quiz-page"
import { PREMIUM_QUIZ_LEVELS } from "@/lib/premium-quiz-system"
import { MISSION_QUESTIONS } from "@/lib/mission-questions" // Importar para validação

// Define os parâmetros estáticos para otimização de build (opcional, mas recomendado)
export async function generateStaticParams() {
  const premiumLevels = Object.keys(PREMIUM_QUIZ_LEVELS).map((level) => ({
    param: level,
  }))

  const missionIds = Object.keys(MISSION_QUESTIONS).map((id) => ({
    param: id,
  }))

  return [...premiumLevels, ...missionIds]
}

interface QuizParamPageProps {
  params: {
    param: string
  }
}

export default function QuizParamPage({ params }: QuizParamPageProps) {
  const { param } = params

  // Tenta converter o parâmetro para um número (para IDs de missão)
  const missionId = Number.parseInt(param)
  const isNumericParam = !isNaN(missionId) && missionId > 0

  // Verifica se é um ID de missão válido
  if (isNumericParam && MISSION_QUESTIONS[missionId]) {
    return <MissionQuizPage missionId={missionId} />
  }

  // Verifica se é um nível premium válido (string)
  if (PREMIUM_QUIZ_LEVELS[param]) {
    return <PremiumQuizPage level={param} />
  }

  // Se o parâmetro não corresponde a nenhum quiz conhecido, redireciona para 404
  redirect("/404") // Ou para uma página de erro personalizada
}
