// Route configuration to prevent conflicts
export const ROUTE_CONFIG = {
  // Mission-based quizzes (free tier) - using 'id' parameter
  MISSION_QUIZ: "/quiz/[id]",
  MISSION_RESULTS: "/quiz/[id]/results",

  // Premium level-based quizzes - using 'id' parameter for consistency
  PREMIUM_QUIZ: "/premium-quiz/[id]",
  PREMIUM_RESULTS: "/premium-quiz/[id]/results",

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
export const generatePremiumRoute = (id: string) => `/premium-quiz/${id}`
export const generatePremiumResultsRoute = (id: string) => `/premium-quiz/${id}/results`
