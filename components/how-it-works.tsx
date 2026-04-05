"use client"

import { Upload, Cpu, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Resume",
    description: "Drag and drop your PDF/TXT resume or paste your professional summary directly."
  },
  {
    icon: Cpu,
    step: "02",
    title: "Add Job Description",
    description: "Paste the job posting you want to apply for or match against."
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "Get AI Analysis",
    description: "Receive instant insights on skill matches, gaps, and improvement tips."
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass border-accent/30 text-accent text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent neon-text">
              Three-Step
            </span>{" "}
            Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get your resume analyzed in minutes with our streamlined process.
            No account required, no complex setup.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) with glow */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 neon-glow" />

          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className="text-center group">
                {/* Icon Circle with 3D effect */}
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full glass flex items-center justify-center border border-border/50 group-hover:border-primary/50 transition-all duration-300 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform neon-glow">
                      <step.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                  </div>
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full glass border border-primary/30 flex items-center justify-center neon-glow">
                    <span className="text-sm font-bold text-primary">{step.step}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>

              {/* Arrow (mobile) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-6 md:hidden">
                  <ArrowRight className="w-6 h-6 text-primary/50 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
