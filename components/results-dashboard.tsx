"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { CheckCircle2, XCircle, Lightbulb, TrendingUp, BookOpen, Target, Zap, Volume2, VolumeX, Map, MessageSquare, BarChart3, FileBadge } from "lucide-react"

interface AnalysisResults {
  matchScore: number
  matchingSkills: string[]
  missingSkills: string[]
  breakdown: {
    skills: number
    experience: number
    keywords: number
  }
  feedback: string[]
  roadmap: {
    day: string
    title: string
    desc: string
  }[]
  suggestions: {
    icon: "learn" | "improve" | "target"
    title: string
    description: string
  }[]
}

interface ResultsDashboardProps {
  results: AnalysisResults | null
  isAnalyzing: boolean
}

// We removed TiltCard here

function CircularProgress({ score, isAnimating }: { score: number; isAnimating: boolean }) {
  const [displayScore, setDisplayScore] = useState(0)
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  useEffect(() => {
    if (isAnimating) {
      setDisplayScore(0)
      const timer = setTimeout(() => {
        const duration = 1500
        const startTime = Date.now()
        
        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          const easeOut = 1 - Math.pow(1 - progress, 3)
          setDisplayScore(Math.round(score * easeOut))
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        
        requestAnimationFrame(animate)
      }, 300)
      
      return () => clearTimeout(timer)
    } else {
      setDisplayScore(score)
    }
  }, [score, isAnimating])

  const getScoreColor = () => {
    if (displayScore >= 70) return "text-emerald-400"
    if (displayScore >= 40) return "text-amber-400"
    return "text-rose-400"
  }

  const getStrokeColor = () => {
    if (displayScore >= 70) return "#34d399"
    if (displayScore >= 40) return "#fbbf24"
    return "#fb7185"
  }

  return (
    <div className="relative w-44 h-44 animate-float">
      {/* Outer glow ring */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 blur-xl"
        style={{ backgroundColor: getStrokeColor() }}
      />
      
      <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-secondary/50"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{ 
            filter: `drop-shadow(0 0 12px ${getStrokeColor()})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className={`text-5xl font-bold ${getScoreColor()} neon-text`}>
          {displayScore}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">Overall Match</span>
      </div>
    </div>
  )
}

function SkillTag({ skill, type, index }: { skill: string; type: "match" | "missing"; index: number }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
        animate-in fade-in slide-in-from-bottom-2
        ${type === "match" 
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 hover:scale-105" 
          : "bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 hover:scale-105"
        }
      `}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {type === "match" ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <XCircle className="w-3.5 h-3.5" />
      )}
      {skill}
    </span>
  )
}

function SuggestionCard({ suggestion, index }: { suggestion: AnalysisResults["suggestions"][0]; index: number }) {
  const icons = {
    learn: BookOpen,
    improve: TrendingUp,
    target: Target
  }
  const Icon = icons[suggestion.icon]

  return (
    <div 
      className="flex gap-3 p-4 rounded-xl glass border border-border/50 hover:border-primary/30 transition-all group glass-card-hover animate-in fade-in slide-in-from-right"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors neon-glow">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h4 className="font-medium text-foreground text-sm">{suggestion.title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{suggestion.description}</p>
      </div>
    </div>
  )
}

export function ResultsDashboard({ results, isAnalyzing }: ResultsDashboardProps) {
  const [showResults, setShowResults] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    if (results && !isAnalyzing) {
      setShowResults(true)
    }
  }, [results, isAnalyzing])

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel()
    }
  }, [])

  const handleSpeak = () => {
    if (!results || !window.speechSynthesis) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const text = `Your overall resume match score is ${results.matchScore} percent. 
    You have a skills match of ${results.breakdown.skills} percent,
    an experience match of ${results.breakdown.experience} percent, 
    and a keyword optimization of ${results.breakdown.keywords} percent.
    ${results.missingSkills.length > 0 ? `You are missing key skills such as ${results.missingSkills.slice(0, 3).join(", ")}.` : "You have an excellent keyword match!"}
    ${results.feedback[0] || ""}
    Check out your personalized roadmap below to improve your chances.`

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    setIsSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  if (!results) {
    return (
      <motion.div 
        whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(139, 92, 246, 0.15)" }}
        transition={{ duration: 0.3 }}
        className="glass-card rounded-2xl p-6 min-h-[500px] flex items-center justify-center w-full"
      >
        <div className="text-center space-y-4">
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }} 
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-24 h-24 rounded-full glass flex items-center justify-center mx-auto neon-glow"
          >
            <Zap className="w-12 h-12 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
          </motion.div>
          <div>
            <h3 className="text-lg font-medium text-foreground">Ready to Analyze</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Upload your resume and paste a job description to see your match score
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(139, 92, 246, 0.15)" }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl p-6 h-full relative overflow-hidden backdrop-blur-xl bg-background/40 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)]"
    >
        
        {/* Header & Voice Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Analysis Results</h3>
              <p className="text-sm text-muted-foreground">Your resume match breakdown</p>
            </div>
          </div>
          
          <button 
            onClick={handleSpeak}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${isSpeaking ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.6)]' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            {isSpeaking ? "Stop" : "Explain Score"}
          </button>
        </div>

        <div className={`space-y-8 ${showResults ? "animate-in fade-in duration-500" : ""}`}>
          
          {/* Main Score & Top-Level ATS Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <CircularProgress score={results.matchScore} isAnimating={showResults} />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-sm text-foreground">ATS Breakdown</h4>
              </div>
              
              <div className="space-y-3">
                {/* Skills Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Skills Match</span>
                    <span className="font-medium">{results.breakdown.skills}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <motion.div className="h-full bg-emerald-400" initial={{ width: 0 }} animate={{ width: `${results.breakdown.skills}%` }} transition={{ duration: 1, delay: 0.2 }} />
                  </div>
                </div>
                {/* Experience Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{results.breakdown.experience}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <motion.div className="h-full bg-blue-400" initial={{ width: 0 }} animate={{ width: `${results.breakdown.experience}%` }} transition={{ duration: 1, delay: 0.4 }} />
                  </div>
                </div>
                {/* Keywords Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Keywords (SEO)</span>
                    <span className="font-medium">{results.breakdown.keywords}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <motion.div className="h-full bg-purple-400" initial={{ width: 0 }} animate={{ width: `${results.breakdown.keywords}%` }} transition={{ duration: 1, delay: 0.6 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-border/50 w-full" />

          {/* AI Human-like Feedback */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <h4 className="font-medium text-foreground">AI Review Notes</h4>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
              {results.feedback.map((note, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.2) }}
                  key={i} className="flex gap-2 text-sm text-foreground/90"
                >
                  <span className="text-blue-400 shrink-0 mt-0.5">•</span>
                  <span>{note}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h4 className="font-medium text-sm text-foreground">Matched Skills</h4>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">{results.matchingSkills.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {results.matchingSkills.length > 0 ? results.matchingSkills.map((skill, index) => (
                  <SkillTag key={index} skill={skill} type="match" index={index} />
                )) : <span className="text-xs text-muted-foreground">No matches found.</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-rose-400" />
                <h4 className="font-medium text-sm text-foreground">Missing Skills</h4>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400">{results.missingSkills.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {results.missingSkills.length > 0 ? results.missingSkills.map((skill, index) => (
                  <SkillTag key={index} skill={skill} type="missing" index={index} />
                )) : <span className="text-xs text-muted-foreground">No missing skills!</span>}
              </div>
            </div>
          </div>

          <div className="h-px bg-border/50 w-full" />

          {/* Dynamic Career Roadmap */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Map className="w-5 h-5 text-accent" />
              <h4 className="font-semibold text-foreground">Your Career Roadmap</h4>
              <span className="text-[10px] uppercase tracking-widest bg-accent/20 text-accent px-2 py-0.5 rounded-full">AI Generated</span>
            </div>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {results.roadmap.map((step, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={index} 
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-primary bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 neon-glow">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] glass border border-white/5 p-3 rounded-lg hover:border-primary/40 transition-colors shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-semibold text-foreground text-sm">{step.title}</h5>
                      <span className="text-xs text-primary font-medium bg-primary/10 px-2 rounded-md">{step.day}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
    </motion.div>
  )
}
