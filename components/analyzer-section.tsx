"use client"

import { useState } from "react"
import { UploadPanel } from "./upload-panel"
import { ResultsDashboard } from "./results-dashboard"
import { analyzeResume } from "@/lib/analyzer"
import { saveApplication } from "@/lib/storage"

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

// Removed static mock function in favor of dynamic engine

export function AnalyzerSection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalysisResults | null>(null)
  const [typingText, setTypingText] = useState("")
  const [submissionSuccess, setSubmissionSuccess] = useState(false)

  const analyzeText = "AI is analyzing your resume..."

  const handleAnalyze = async (data: {
    resume: File | null
    resumeText: string
    jobDescription: string
    studentName: string
    email: string
  }) => {
    setIsAnalyzing(true)
    setResults(null)
    setTypingText("")
    setSubmissionSuccess(false)

    // Extract PDF text if a PDF file was uploaded directly without manual text
    let finalResumeText = data.resumeText || "";
    if (data.resume && data.resume.type === "application/pdf" && !finalResumeText) {
      setTypingText("Extracting PDF contents natively...")
      try {
        finalResumeText = await new Promise<string>((resolve, reject) => {
          if (!(window as any).pdfjsLib) {
            const script = document.createElement("script")
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
            script.onload = () => {
              (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
              processPdf()
            }
            script.onerror = () => reject(new Error("Failed to load PDF engine"))
            document.head.appendChild(script)
          } else {
            processPdf()
          }

          function processPdf() {
            const reader = new FileReader()
            reader.onload = async function() {
              try {
                const typedarray = new Uint8Array(this.result as ArrayBuffer)
                const pdfData = await (window as any).pdfjsLib.getDocument(typedarray).promise
                let fullText = ""
                for (let i = 1; i <= pdfData.numPages; i++) {
                  const page = await pdfData.getPage(i)
                  const textContent = await page.getTextContent()
                  fullText += textContent.items.map((item: any) => item.str).join(" ") + " "
                }
                resolve(fullText)
              } catch (e) {
                reject(e)
              }
            }
            reader.onerror = reject
            reader.readAsArrayBuffer(data.resume as File)
          }
        })
      } catch (err) {
        console.error("Browser PDF Extraction failed:", err)
      }
    }

    // Typing animation
    for (let i = 0; i <= analyzeText.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50))
      setTypingText(analyzeText.slice(0, i))
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500))

    const rawResults = analyzeResume(finalResumeText || "Empty", data.jobDescription || "Empty")
    
    // Dynamically generate flavor suggestions
    const suggestions: any[] = []
    if (rawResults.missingSkills.length > 0) {
      suggestions.push({
        icon: "learn",
        title: `Learn ${rawResults.missingSkills[0]}`,
        description: `Expand your profile by adding ${rawResults.missingSkills[0]} to match job requirements.`
      })
    }
    if (rawResults.matchingSkills.length > 0) {
      suggestions.push({
        icon: "improve",
        title: `Highlight ${rawResults.matchingSkills[0]}`,
        description: `Ensure your strong experience with ${rawResults.matchingSkills[0]} is prominent on page one.`
      })
    }
    if (suggestions.length === 0) {
      suggestions.push({
        icon: "target",
        title: "ATS Optimization",
        description: "Ensure your formatting is easily readable by standard Application Tracking Systems."
      })
    }

    const mockResults = {
      ...rawResults,
      suggestions
    }

    setResults(mockResults)
    setIsAnalyzing(false)
    setTypingText("")

    // Save strictly to local storage safely
    try {
      saveApplication({
        id: Math.random().toString(36).substring(7),
        student_name: data.studentName || "Anonymous User",
        email: data.email || "no-reply@example.com",
        resume_text: finalResumeText || "File uploaded",
        job_description: data.jobDescription || "General Application",
        match_score: mockResults.matchScore,
        matching_skills: mockResults.matchingSkills,
        missing_skills: mockResults.missingSkills,
        status: mockResults.matchScore >= 75 ? "accepted" : "pending",
        created_at: new Date().toISOString()
      })
      setSubmissionSuccess(true)
    } catch (err) {
      console.error("Storage Error:", err)
    }
  }

  return (
    <section id="analyzer" className="py-20 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Resume Match{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent neon-text">
              Analyzer
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload your resume and paste the job description to get instant AI-powered analysis 
            of how well your skills match the requirements.
          </p>
        </div>

        {/* Typing Animation */}
        {isAnalyzing && typingText && (
          <div className="text-center mb-8 animate-in fade-in duration-300">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/30 neon-glow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary font-medium">
                {typingText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </div>
        )}

        {/* Success Message */}
        {submissionSuccess && (
          <div className="text-center mb-8 animate-in fade-in duration-300">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-emerald-400 font-medium">
                Application submitted successfully! Companies can now view your profile.
              </span>
            </div>
          </div>
        )}

        {/* Two Column Layout with 3D perspective */}
        <div className="grid lg:grid-cols-2 gap-8 perspective-container">
          {/* Left Panel - Upload */}
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <UploadPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>

          {/* Right Panel - Results */}
          <div className="animate-in fade-in slide-in-from-right duration-700 delay-150">
            <ResultsDashboard results={results} isAnalyzing={isAnalyzing} />
          </div>
        </div>
      </div>
    </section>
  )
}
