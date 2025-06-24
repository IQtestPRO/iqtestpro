import { MobileTestingOverlay } from "@/components/mobile-testing-overlay"

export default function TestMobilePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Mobile Testing Page</h1>
          <p className="text-muted-foreground">
            This page helps you verify the background overlap fix across different devices.
          </p>
        </div>

        {/* Sample content to test visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border">
            <h3 className="font-semibold mb-2">Test Card 1</h3>
            <p className="text-sm text-muted-foreground mb-4">This card should be fully visible on all devices.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Test Button</button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg text-white">
            <h3 className="font-semibold mb-2">Test Card 2</h3>
            <p className="text-sm mb-4 opacity-90">This gradient card should not be hidden by backgrounds.</p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100">Test Button</button>
          </div>

          <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
            <h3 className="font-semibold mb-2 text-green-800">Test Card 3</h3>
            <p className="text-sm text-green-600 mb-4">All elements should be interactive and visible.</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Test Button</button>
          </div>
        </div>

        {/* Image test */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-4">Image Visibility Test</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="/placeholder.svg?height=100&width=100&text=Image1"
              alt="Test Image 1"
              className="w-full h-24 object-cover rounded"
            />
            <img
              src="/placeholder.svg?height=100&width=100&text=Image2"
              alt="Test Image 2"
              className="w-full h-24 object-cover rounded"
            />
            <img
              src="/placeholder.svg?height=100&width=100&text=Image3"
              alt="Test Image 3"
              className="w-full h-24 object-cover rounded"
            />
            <img
              src="/placeholder.svg?height=100&width=100&text=Image4"
              alt="Test Image 4"
              className="w-full h-24 object-cover rounded"
            />
          </div>
        </div>

        {/* Form test */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-4">Form Interaction Test</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              Submit Test Form
            </button>
          </form>
        </div>
      </div>

      <MobileTestingOverlay />
    </div>
  )
}
