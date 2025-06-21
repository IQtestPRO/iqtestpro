// Safe asset loading utility to prevent file system errors
export class AssetLoader {
  private static cache = new Map<string, boolean>()

  static async checkAssetExists(path: string): Promise<boolean> {
    if (this.cache.has(path)) {
      return this.cache.get(path)!
    }

    try {
      const response = await fetch(path, { method: "HEAD" })
      const exists = response.ok
      this.cache.set(path, exists)
      return exists
    } catch {
      this.cache.set(path, false)
      return false
    }
  }

  static getPlaceholderUrl(width = 400, height = 300, text = "Image"): string {
    return `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(text)}`
  }

  static async getSafeImageUrl(originalPath: string, fallbackText = "Image"): Promise<string> {
    const exists = await this.checkAssetExists(originalPath)
    if (exists) {
      return originalPath
    }
    return this.getPlaceholderUrl(400, 300, fallbackText)
  }
}
