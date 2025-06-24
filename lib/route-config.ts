// Route configuration to prevent conflicts
export const ROUTE_CONFIG = {
  // Mission-based quizzes (free tier)
  MISSION_QUIZ: "/quiz/[id]",
  MISSION_RESULTS: "/quiz/[id]/results",

  // Premium level-based quizzes
  PREMIUM_QUIZ: "/premium-quiz/[level]",
  PREMIUM_RESULTS: "/premium-quiz/[level]/results",

  // Other routes
  PREMIUM: "/premium",
  HOME: "/",
  ABOUT: "/about",
  FAQ: "/faq",
} as const

export type RouteKey = keyof typeof ROUTE_CONFIG
export type RouteValue = (typeof ROUTE_CONFIG)[RouteKey]

// Helper functions for route generation
export const generateMissionRoute = (id: number) => `/quiz/${id}`
export const generateMissionResultsRoute = (id: number) => `/quiz/${id}/results`
export const generatePremiumRoute = (level: string) => `/premium-quiz/${level}`
export const generatePremiumResultsRoute = (level: string) => `/premium-quiz/${level}/results`
