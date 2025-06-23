import type React from "react"

interface FAQButtonProps {
  title: string
  onClick: () => void
}

const ProfessionalFAQButtons: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Enhanced Background with Neural Network Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 via-white/90 to-blue-50/80 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-blue-950/80 rounded-2xl backdrop-blur-sm"></div>

      {/* Neural Network Pattern Overlay */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.03) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(147, 51, 234, 0.03) 50%, transparent 60%)
            `,
            backgroundSize: "60px 60px, 60px 60px",
            backgroundPosition: "0 0, 30px 30px",
          }}
        />
      </div>

      {/* Floating Brain Synapses */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 dark:bg-blue-300/30 rounded-full animate-pulse"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-3 rounded-2xl"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Add your content here, e.g., FAQ buttons */}
        <div>
          {/* Example Button - Replace with your actual buttons */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Example FAQ Button
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalFAQButtons
