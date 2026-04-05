"use client"

import { Brain, BarChart3, Compass, Zap, Shield, Clock } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Skill Extraction",
    description: "Advanced NLP algorithms automatically identify and extract skills from your resume and job descriptions with high accuracy."
  },
  {
    icon: BarChart3,
    title: "Smart Match Scoring",
    description: "Our proprietary scoring system weighs skills by importance, giving you a precise match percentage for any job posting."
  },
  {
    icon: Compass,
    title: "Career Roadmap Suggestions",
    description: "Receive personalized learning recommendations and career paths based on skill gaps and industry trends."
  }
]

const additionalFeatures = [
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Get results in seconds, not minutes"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and secure"
  },
  {
    icon: Clock,
    title: "Always Available",
    description: "24/7 access from any device"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass border-primary/30 text-primary text-sm font-medium mb-4 neon-glow">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powered by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent neon-text">
              Advanced AI
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our cutting-edge technology analyzes your resume against job requirements 
            to give you actionable insights for career success.
          </p>
        </div>

        {/* Main Feature Cards with 3D effect */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 perspective-container">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass-card rounded-2xl p-6 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 neon-glow">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 animate-shimmer" />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid sm:grid-cols-3 gap-4">
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl glass border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:neon-glow transition-all">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
