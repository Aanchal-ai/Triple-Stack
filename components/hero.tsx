"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import Link from "next/link"

function FloatingOrb({ className, delay = "0" }: { className?: string; delay?: string }) {
  return (
    <div 
      className={`absolute rounded-full blur-3xl animate-float-slow ${className}`}
      style={{ animationDelay: delay }}
    />
  )
}

function Floating3DCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`perspective-container ${className}`}>
      <div 
        className="glass-card rounded-2xl p-6 card-3d card-shine hover-lift transform-gpu"
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs with 3D effect */}
        <FloatingOrb className="top-1/4 left-1/4 w-96 h-96 bg-primary/30" delay="0s" />
        <FloatingOrb className="bottom-1/4 right-1/4 w-96 h-96 bg-accent/20" delay="2s" />
        <FloatingOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-accent/10" delay="4s" />
        
        {/* Orbiting particles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-primary rounded-full animate-orbit opacity-50" />
          <div className="w-3 h-3 bg-accent rounded-full animate-orbit opacity-40" style={{ animationDelay: "-5s" }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-orbit opacity-30" style={{ animationDelay: "-10s" }} />
        </div>
        
        {/* Grid pattern with glow */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge with glow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 neon-glow animate-glow-border">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm text-foreground/80">AI-Powered Resume Analysis</span>
        </div>

        {/* Main Heading with Neon Effect */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          <span className="text-foreground">Check How Well Your</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient neon-text">
            Resume Matches
          </span>
          <br />
          <span className="text-foreground">Your Dream Job</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 leading-relaxed">
          Upload your resume and job description to get instant AI-powered insights. 
          Discover matching skills, identify gaps, and receive personalized improvement tips.
        </p>

        {/* CTA Buttons with 3D effect */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-primary-foreground shadow-lg shadow-primary/25 group px-8 btn-3d btn-ripple animate-glow-pulse"
            asChild
          >
            <Link href="#analyzer">
              <Sparkles className="mr-2 w-4 h-4" />
              Upload Resume
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="glass border-primary/30 hover:border-primary/50 hover:bg-primary/10 group px-8 btn-3d btn-ripple"
            asChild
          >
            <Link href="#analyzer">
              <Play className="mr-2 w-4 h-4" />
              Try Demo
            </Link>
          </Button>
        </div>

        {/* 3D Floating Stats Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-700 delay-700">
          <Floating3DCard delay={0}>
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">50K+</div>
            <div className="text-sm text-muted-foreground mt-1">Resumes Analyzed</div>
          </Floating3DCard>
          <Floating3DCard delay={100}>
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">95%</div>
            <div className="text-sm text-muted-foreground mt-1">Accuracy Rate</div>
          </Floating3DCard>
          <Floating3DCard delay={200}>
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">10K+</div>
            <div className="text-sm text-muted-foreground mt-1">Jobs Matched</div>
          </Floating3DCard>
        </div>
      </div>

      {/* Scroll indicator with glow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 neon-glow animate-glow-border">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
