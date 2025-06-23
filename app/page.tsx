import HeroSection from "@/components/hero-section"
import ProfessionalTestLevels from "@/components/professional-test-levels"
import ChooseTestLevelSection from "@/components/choose-test-level-section"
import TransparentStats from "@/components/transparent-stats"

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Main Content - Ensure it's above backgrounds */}
      <div className="relative z-10">
        <HeroSection />
        <ProfessionalTestLevels />
        <ChooseTestLevelSection />
        <TransparentStats />
      </div>
    </div>
  )
}
