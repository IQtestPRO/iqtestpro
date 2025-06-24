// Route cleanup script to ensure no conflicts
import { promises as fs } from "fs"
import path from "path"

async function cleanupRoutes() {
  const routesToCheck = [
    "app/quiz/[level]",
    "app/quiz/[level]/results",
    "app/quiz/[level]/page.tsx",
    "app/quiz/[level]/results/page.tsx",
  ]

  for (const route of routesToCheck) {
    try {
      const fullPath = path.join(process.cwd(), route)
      const stats = await fs.stat(fullPath)

      if (stats.isDirectory()) {
        console.log(`Removing conflicting directory: ${route}`)
        await fs.rmdir(fullPath, { recursive: true })
      } else if (stats.isFile()) {
        console.log(`Removing conflicting file: ${route}`)
        await fs.unlink(fullPath)
      }
    } catch (error) {
      // File/directory doesn't exist, which is what we want
      console.log(`Route ${route} doesn't exist (good)`)
    }
  }

  console.log("Route cleanup completed!")
}

cleanupRoutes().catch(console.error)
