import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AnalyzerSection } from "@/components/analyzer-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { ThreeDBackground } from "@/components/3d-background"

export default function Home() {
  return (
    <main className="min-h-screen relative z-0">
      <ThreeDBackground />
      <Navbar />
      <Hero />
      <AnalyzerSection />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </main>
  )
}
