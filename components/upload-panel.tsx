"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, X, Loader2, Sparkles, FileType, User, Mail } from "lucide-react"

interface UploadPanelProps {
  onAnalyze: (data: {
    resume: File | null
    resumeText: string
    jobDescription: string
    studentName: string
    email: string
  }) => void
  isAnalyzing: boolean
}

export function UploadPanel({ onAnalyze, isAnalyzing }: UploadPanelProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [studentName, setStudentName] = useState("")
  const [email, setEmail] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadMode, setUploadMode] = useState<"file" | "text">("file")

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf')
      const isTXT = file.type === "text/plain" || file.name.toLowerCase().endsWith('.txt')
      
      if (isPDF || isTXT) {
        setResumeFile(file)
        if (isTXT) {
          const reader = new FileReader()
          reader.onload = (event) => {
            setResumeText(event.target?.result as string || "")
          }
          reader.readAsText(file)
        } else {
          setResumeText("") // Clear text on new PDF
        }
      }
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith('.pdf')
      const isTXT = file.type === "text/plain" || file.name.toLowerCase().endsWith('.txt')
      
      if (isPDF || isTXT) {
        setResumeFile(file)
        if (isTXT) {
          const reader = new FileReader()
          reader.onload = (event) => {
            setResumeText(event.target?.result as string || "")
          }
          reader.readAsText(file)
        } else {
          setResumeText("") // Clear text on new PDF
        }
      }
    }
  }

  const handleAnalyze = () => {
    onAnalyze({
      resume: resumeFile,
      resumeText,
      jobDescription,
      studentName,
      email
    })
  }

  const loadDemoData = () => {
    setStudentName("John Doe")
    setEmail("john.doe@example.com")
    setResumeText(`JOHN DOE
Full Stack Developer
john.doe@example.com | (555) 123-4567 | linkedin.com/in/johndoe

SUMMARY
Experienced Full Stack Developer with 4+ years of experience building web applications using React, TypeScript, and Node.js. Strong problem-solving skills and excellent communication abilities.

SKILLS
- Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express, REST APIs
- Database: PostgreSQL, MongoDB
- Tools: Git, VS Code, Figma
- Methodologies: Agile, Scrum

EXPERIENCE
Senior Frontend Developer | TechCorp Inc. | 2021 - Present
- Built responsive web applications using React and TypeScript
- Collaborated with design team to implement UI/UX improvements
- Mentored junior developers and conducted code reviews

Frontend Developer | StartupXYZ | 2019 - 2021
- Developed customer-facing features using React
- Integrated REST APIs and improved application performance
- Participated in Agile sprints and daily standups

EDUCATION
Bachelor of Science in Computer Science
State University | 2019`)
    setUploadMode("text")
    setJobDescription(`Senior Frontend Developer

We are looking for a Senior Frontend Developer to join our team.

Requirements:
- 5+ years of experience with React, TypeScript, and modern frontend frameworks
- Strong understanding of state management (Redux, Zustand, or similar)
- Experience with REST APIs and GraphQL
- Knowledge of testing frameworks (Jest, Cypress)
- Familiarity with CI/CD pipelines
- Strong problem-solving skills
- Excellent communication skills

Nice to have:
- Experience with Next.js
- Knowledge of AWS or cloud services
- Understanding of UI/UX principles
- Experience with Agile methodologies`)
  }

  return (
    <div className="glass-card rounded-2xl p-6 shadow-xl card-3d card-shine" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow btn-3d">
          <Upload className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Upload Documents</h3>
          <p className="text-sm text-muted-foreground">Add your resume and job description</p>
        </div>
      </div>

      {/* Student Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <User className="w-3.5 h-3.5 inline mr-1.5" />
            Your Name
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 rounded-xl glass border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 input-3d transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Mail className="w-3.5 h-3.5 inline mr-1.5" />
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 rounded-xl glass border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 input-3d transition-all"
          />
        </div>
      </div>

      {/* Upload Mode Toggle */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Resume Upload Method
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setUploadMode("file")}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all btn-3d btn-ripple ${
              uploadMode === "file"
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground neon-glow"
                : "glass border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50"
            }`}
          >
            <FileType className="w-4 h-4 inline mr-2" />
            Upload File
          </button>
          <button
            onClick={() => setUploadMode("text")}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all btn-3d btn-ripple ${
              uploadMode === "text"
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground neon-glow"
                : "glass border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Paste Text
          </button>
        </div>
      </div>

      {/* Resume Upload / Text Area */}
      <div className="mb-6">
        {uploadMode === "file" ? (
          <>
            <label className="block text-sm font-medium text-foreground mb-2">
              Resume (PDF or TXT)
            </label>
            <div
              onClick={() => document.getElementById('resume-upload-input')?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
                ${isDragging 
                  ? "border-primary bg-primary/10 neon-glow animate-glow-border" 
                  : resumeFile 
                    ? "border-primary/50 bg-primary/5 neon-glow" 
                    : "border-border/50 glass hover:border-primary/50"
                }
              `}
            >
              <input
                id="resume-upload-input"
                type="file"
                accept=".pdf,.txt,application/pdf,text/plain"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {resumeFile ? (
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">{resumeFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(resumeFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      setResumeFile(null)
                      setResumeText("")
                      const input = document.getElementById('resume-upload-input') as HTMLInputElement
                      if (input) input.value = '';
                    }}
                    className="ml-auto p-2 hover:bg-secondary rounded-lg transition-colors relative z-20"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pointer-events-none">
                  <div className="w-14 h-14 rounded-full glass flex items-center justify-center mx-auto animate-float">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Click to browse or drop file</p>
                    <p className="text-sm text-muted-foreground">PDF or TXT files supported</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium text-foreground mb-2">
              Paste Your Resume Text
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here..."
              className="w-full h-48 px-4 py-3 rounded-xl glass border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none input-3d transition-all font-mono text-sm"
            />
          </>
        )}
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-foreground">
            Job Description
          </label>
          <button
            onClick={loadDemoData}
            className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1 btn-3d btn-ripple px-2 py-1 rounded-lg"
          >
            <Sparkles className="w-3 h-3" />
            Load Demo
          </button>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-40 px-4 py-3 rounded-xl glass border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none input-3d transition-all"
        />
      </div>

      {/* Analyze Button */}
      <Button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !jobDescription.trim() || !studentName.trim() || !email.trim() || (!resumeFile && !resumeText.trim())}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25 h-12 text-base font-medium group btn-3d btn-ripple animate-glow-pulse disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 w-5 h-5 group-hover:animate-pulse" />
            Analyze Match
          </>
        )}
      </Button>
    </div>
  )
}
