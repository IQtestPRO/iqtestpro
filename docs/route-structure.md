# Current Route Structure

## Regular Quizzes (Free)
- `/quiz/[id]/page.tsx` - Regular quiz pages (id: 1, 2, 3, 4)
- `/quiz/[id]/results/page.tsx` - Regular quiz results

## Premium Quizzes
- `/quiz/premium/[level]/page.tsx` - Premium quiz pages (level: spatial, logical, abstract, expert)
- `/quiz/premium/[level]/results/page.tsx` - Premium quiz results

## Other Routes
- `/quiz/page.tsx` - Quiz selection page
- `/premium/page.tsx` - Premium plans page

## Removed Conflicting Routes
- ❌ `/quiz/[level]/page.tsx` - REMOVED (conflicted with [id])
- ❌ `/quiz/[level]/results/page.tsx` - REMOVED (conflicted with [id])

## Route Parameters
- `[id]` - Used for regular quiz IDs (1, 2, 3, 4)
- `[level]` - Used for premium quiz levels (spatial, logical, abstract, expert)
- These are in different path segments to avoid conflicts
