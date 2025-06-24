import { BrowserCompatibilityTester } from "@/components/browser-compatibility-tester"

export default function TestBrowsersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Browser Compatibility Testing</h1>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Brave Browser Testing</h2>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Key Areas to Test:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Background rendering with Brave Shields enabled/disabled</li>
                  <li>Payment forms functionality (Brave blocks some payment scripts)</li>
                  <li>Analytics tracking (often blocked by default)</li>
                  <li>Third-party resources loading</li>
                  <li>CSS animations and transforms</li>
                </ul>

                <p className="mt-4">
                  <strong>Brave-Specific Settings to Test:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Shields Up vs Shields Down</li>
                  <li>Aggressive vs Standard blocking</li>
                  <li>Cross-site cookies blocked</li>
                  <li>Fingerprinting protection</li>
                </ul>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Microsoft Edge Testing</h2>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Key Areas to Test:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Enhanced Security mode compatibility</li>
                  <li>Windows high contrast mode</li>
                  <li>SmartScreen filter interactions</li>
                  <li>IE mode compatibility (if applicable)</li>
                  <li>Collections and sidebar features</li>
                </ul>

                <p className="mt-4">
                  <strong>Edge-Specific Features to Test:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Tracking prevention (Strict/Balanced/Basic)</li>
                  <li>Password manager integration</li>
                  <li>Shopping features</li>
                  <li>Vertical tabs mode</li>
                </ul>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Critical Test Scenarios</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h3 className="font-medium mb-2">Background Overlap Issues</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Homepage hero section visibility</li>
                    <li>Subscription plans not obscured</li>
                    <li>Navigation menu accessibility</li>
                    <li>Footer content readability</li>
                    <li>Form elements clickability</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Interactive Elements</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Payment modal opening</li>
                    <li>Button hover states</li>
                    <li>Link navigation</li>
                    <li>Form submission</li>
                    <li>Mobile menu toggle</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Testing Instructions</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                <li>Open this page in Brave and Edge browsers</li>
                <li>Click the "Test Browser" button in the bottom-right corner</li>
                <li>Run the automated compatibility tests</li>
                <li>Follow the manual testing checklist</li>
                <li>Test with different browser settings (shields, security modes)</li>
                <li>Navigate through all main pages of the website</li>
                <li>Report any issues found during testing</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <BrowserCompatibilityTester />
    </div>
  )
}
