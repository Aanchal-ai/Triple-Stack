"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { getApplications, type Application } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Search, 
  ArrowLeft,
  Sparkles,
  BarChart3,
  Eye,
  Mail,
  FileText,
  RefreshCw,
  Filter,
  Award,
  Target,
  Activity
} from "lucide-react"

import { ThreeDBackground } from "@/components/3d-background"

// Application interface imported from storage

// Animated Score Ring Component (like reference image)
function ScoreRing({ 
  total, 
  high, 
  medium, 
  low 
}: { 
  total: number
  high: number
  medium: number
  low: number 
}) {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  
  return (
    <div className="glass-card rounded-2xl p-6 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] transition-all duration-500">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-5 h-5 text-yellow-400" />
        <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">Score Distribution</h3>
      </div>
      
      <div className="flex items-center gap-8">
        {/* Animated Ring */}
        <div className="relative">
          <svg width="120" height="120" className="transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="rgba(139, 92, 246, 0.1)"
              strokeWidth="12"
            />
            {/* Animated yellow ring */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#facc15"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * 0.2}
              className="score-circle-animated"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.5))'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{total}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Total</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="text-sm text-muted-foreground">High (75+)</span>
            <span className="text-sm font-bold text-emerald-400 ml-auto">{total > 0 ? Math.round((high / total) * 100) : 0}%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-sm text-muted-foreground">Medium (40-74)</span>
            <span className="text-sm font-bold text-yellow-400 ml-auto">{total > 0 ? Math.round((medium / total) * 100) : 0}%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="text-sm text-muted-foreground">Low (&lt;40)</span>
            <span className="text-sm font-bold text-rose-400 ml-auto">{total > 0 ? Math.round((low / total) * 100) : 0}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Score Buckets Chart Component (like reference image)
function ScoreBuckets({ applications }: { applications: Application[] }) {
  const buckets = useMemo(() => {
    const b = { '0-25': 0, '25-50': 0, '50-75': 0, '75-100': 0 }
    applications.forEach(app => {
      const score = app.match_score || 0
      if (score < 25) b['0-25']++
      else if (score < 50) b['25-50']++
      else if (score < 75) b['50-75']++
      else b['75-100']++
    })
    return b
  }, [applications])
  
  const maxCount = Math.max(...Object.values(buckets), 1)
  
  return (
    <div className="glass-card rounded-2xl p-6 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] transition-all duration-500">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">Score Buckets</h3>
      </div>
      
      <div className="space-y-4">
        {Object.entries(buckets).map(([range, count]) => (
          <div key={range} className="group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">{range}</span>
              <span className="text-sm font-bold text-blue-400">{count}</span>
            </div>
            <div className="h-2 rounded-full bg-secondary/30 overflow-hidden">
              <div 
                className="h-full rounded-full progress-blue progress-animated transition-all duration-500 group-hover:shadow-lg"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Top Skills Chart Component (like reference image)
function TopSkillsChart({ 
  skills, 
  type 
}: { 
  skills: { name: string; count: number }[]
  type: 'matching' | 'missing' 
}) {
  const maxCount = Math.max(...skills.map(s => s.count), 1)
  const isMatching = type === 'matching'
  
  return (
    <div className="glass-card rounded-2xl p-6 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] transition-all duration-500">
      <div className="flex items-center gap-2 mb-6">
        {isMatching ? (
          <Target className="w-5 h-5 text-emerald-400" />
        ) : (
          <XCircle className="w-5 h-5 text-rose-400" />
        )}
        <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">
          Top {isMatching ? 'Matching' : 'Missing'} Skills
        </h3>
      </div>
      
      <div className="space-y-4">
        {skills.slice(0, 5).map((skill, index) => (
          <div key={skill.name} className="group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-foreground">{skill.name}</span>
              <span className={`text-sm font-bold ${isMatching ? 'text-emerald-400' : 'text-rose-400'}`}>
                {skill.count}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary/30 overflow-hidden">
              <div 
                className={`h-full rounded-full progress-animated transition-all duration-500 group-hover:shadow-lg ${
                  isMatching ? 'progress-teal' : 'progress-coral'
                }`}
                style={{ 
                  width: `${(skill.count / maxCount) * 100}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              />
            </div>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No data available</p>
        )}
      </div>
    </div>
  )
}

// Recent Activity Component (like reference image)
function RecentActivity({ applications }: { applications: Application[] }) {
  const recent = applications.slice(0, 5)
  
  return (
    <div className="glass-card rounded-2xl p-6 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] transition-all duration-500">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">Recent Activity</h3>
      </div>
      
      <div className="space-y-4">
        {recent.map((app) => (
          <div 
            key={app.id} 
            className="flex items-center gap-3 p-3 rounded-xl glass hover:bg-primary/5 transition-all duration-300 hover-lift cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-sm font-bold text-primary">
              {app.student_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{app.student_name}</p>
              <p className="text-xs text-muted-foreground truncate">{app.job_description.split('\n')[0]}</p>
            </div>
            <div className={`text-lg font-bold ${
              (app.match_score || 0) >= 70 ? 'text-emerald-400' :
              (app.match_score || 0) >= 40 ? 'text-yellow-400' : 'text-rose-400'
            }`}>
              {app.match_score || 0}%
            </div>
          </div>
        ))}
        {recent.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
        )}
      </div>
    </div>
  )
}

// Daily Submissions Chart
function DailySubmissions({ applications }: { applications: Application[] }) {
  const dailyData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        date: date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
        count: 0
      }
    })
    
    applications.forEach(app => {
      const appDate = new Date(app.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })
      const dayEntry = last7Days.find(d => d.date === appDate)
      if (dayEntry) dayEntry.count++
    })
    
    return last7Days
  }, [applications])
  
  const maxCount = Math.max(...dailyData.map(d => d.count), 1)
  
  return (
    <div className="glass-card rounded-2xl p-6 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] transition-all duration-500">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-accent" />
        <h3 className="font-semibold text-foreground uppercase tracking-wider text-sm">Daily Submissions</h3>
      </div>
      
      <div className="relative h-32">
        {/* Y-axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2].map((_, i) => (
            <div key={i} className="border-b border-border/20" />
          ))}
        </div>
        
        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-between gap-2 pt-4 pb-6">
          {dailyData.map((day, index) => (
            <div key={day.date} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
              <div 
                className="w-full rounded-t-lg bg-gradient-to-t from-primary/80 to-accent/80 transition-all duration-500 hover:from-primary hover:to-accent"
                style={{ 
                  height: `${Math.max((day.count / maxCount) * 100, 5)}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              />
            </div>
          ))}
        </div>
        
        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
          {dailyData.map((day) => (
            <span key={day.date} className="flex-1 text-center">{day.date}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  color 
}: { 
  icon: any
  label: string
  value: string | number
  trend?: string
  color: string 
}) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] transition-all duration-500 hover-lift">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-2 text-foreground">{value}</p>
          {trend && (
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} neon-glow btn-3d`}>
          {/* @ts-ignore */}
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  )
}

function ApplicationRow({ 
  application, 
  onView 
}: { 
  application: Application
  onView: (app: Application) => void 
}) {
  const getScoreColor = (score: number | null) => {
    if (!score) return "text-muted-foreground"
    if (score >= 70) return "text-emerald-400"
    if (score >= 40) return "text-amber-400"
    return "text-rose-400"
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      reviewed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      accepted: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      rejected: "bg-rose-500/20 text-rose-400 border-rose-500/30"
    }
    return styles[status] || styles.pending
  }

  return (
    <tr className="border-b border-border/30 hover:bg-primary/5 transition-all duration-300 group">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center btn-3d">
            <span className="text-sm font-medium text-primary">
              {application.student_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{application.student_name}</p>
            <p className="text-xs text-muted-foreground">{application.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className={`text-2xl font-bold ${getScoreColor(application.match_score)}`}>
          {application.match_score ? `${application.match_score}%` : "N/A"}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex flex-wrap gap-1 max-w-xs">
          {application.matching_skills?.slice(0, 3).map((skill, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 hover-lift cursor-default">
              {skill}
            </span>
          ))}
          {(application.matching_skills?.length || 0) > 3 && (
            <span className="text-xs text-muted-foreground">
              +{(application.matching_skills?.length || 0) - 3} more
            </span>
          )}
        </div>
      </td>
      <td className="py-4 px-4">
        <span className={`text-xs px-3 py-1 rounded-full border ${getStatusBadge(application.status)} btn-3d`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </td>
      <td className="py-4 px-4">
        <span className="text-sm text-muted-foreground">
          {new Date(application.created_at).toLocaleDateString()}
        </span>
      </td>
      <td className="py-4 px-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(application)}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 btn-3d btn-ripple hover:bg-primary/20"
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
      </td>
    </tr>
  )
}

function ApplicationModal({ 
  application, 
  onClose 
}: { 
  application: Application
  onClose: () => void 
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative z-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">{application.student_name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" />
              {application.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 glass rounded-lg hover:bg-primary/10 transition-all duration-300 btn-3d btn-ripple"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Match Score */}
        <div className="glass rounded-xl p-6 mb-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Match Score</p>
          <div className="relative inline-block">
            <svg width="120" height="120" className="transform -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(139, 92, 246, 0.1)"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={(application.match_score || 0) >= 70 ? '#10b981' : 
                        (application.match_score || 0) >= 40 ? '#facc15' : '#f87171'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 50}
                strokeDashoffset={2 * Math.PI * 50 * (1 - (application.match_score || 0) / 100)}
                className="score-circle-animated"
                style={{
                  filter: `drop-shadow(0 0 10px ${
                    (application.match_score || 0) >= 70 ? 'rgba(16, 185, 129, 0.5)' : 
                    (application.match_score || 0) >= 40 ? 'rgba(250, 204, 21, 0.5)' : 'rgba(248, 113, 113, 0.5)'
                  })`
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-4xl font-bold ${
                (application.match_score || 0) >= 70 ? "text-emerald-400" :
                (application.match_score || 0) >= 40 ? "text-yellow-400" : "text-rose-400"
              }`}>
                {application.match_score || 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass rounded-xl p-4 hover-lift">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Matching Skills
            </h4>
            <div className="flex flex-wrap gap-1">
              {application.matching_skills?.map((skill, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover-lift cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-4 hover-lift">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-400" />
              Missing Skills
            </h4>
            <div className="flex flex-wrap gap-1">
              {application.missing_skills?.map((skill, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 hover-lift cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Resume Text */}
        {application.resume_text && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Resume Content
            </h4>
            <div className="glass rounded-xl p-4 max-h-48 overflow-y-auto hover-lift">
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono">
                {application.resume_text}
              </pre>
            </div>
          </div>
        )}

        {/* Job Description */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            Job Description
          </h4>
          <div className="glass rounded-xl p-4 max-h-48 overflow-y-auto hover-lift">
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
              {application.job_description}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const data = getApplications()
      setApplications(data || [])
    } catch (e) {
      console.error("Failed to load generic application storage:", e)
      setApplications([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = useMemo(() => ({
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    avgScore: applications.length > 0 
      ? Math.round(applications.reduce((sum, a) => sum + (a.match_score || 0), 0) / applications.length)
      : 0,
    highMatch: applications.filter(a => (a.match_score || 0) >= 70).length,
    mediumMatch: applications.filter(a => (a.match_score || 0) >= 40 && (a.match_score || 0) < 70).length,
    lowMatch: applications.filter(a => (a.match_score || 0) < 40).length
  }), [applications])

  // Aggregate skills data
  const skillsData = useMemo(() => {
    const matchingSkillsMap: Record<string, number> = {}
    const missingSkillsMap: Record<string, number> = {}
    
    applications.forEach(app => {
      app.matching_skills?.forEach(skill => {
        matchingSkillsMap[skill] = (matchingSkillsMap[skill] || 0) + 1
      })
      app.missing_skills?.forEach(skill => {
        missingSkillsMap[skill] = (missingSkillsMap[skill] || 0) + 1
      })
    })
    
    const topMatching = Object.entries(matchingSkillsMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
    
    const topMissing = Object.entries(missingSkillsMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
    
    return { topMatching, topMissing }
  }, [applications])

  return (
    <main className="min-h-screen relative z-0">
      <ThreeDBackground />
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10">
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="glass btn-3d btn-ripple">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow btn-3d">
                  <BarChart3 className="w-5 h-5 text-primary-foreground" />
                </div>
                Company Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">View and manage student applications</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (window.confirm("Are you sure you want to delete all history?")) {
                  localStorage.setItem("analyzer_applications", "[]");
                  setApplications([]);
                }
              }}
              variant="outline"
              className="border-rose-500/50 text-rose-400 hover:bg-rose-500/10 btn-3d btn-ripple"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Clear History
            </Button>
            <Button
              onClick={fetchApplications}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground btn-3d btn-ripple"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={Users} 
            label="Total Applications" 
            value={stats.total}
            trend="+12% this week"
            color="bg-gradient-to-br from-primary to-accent"
          />
          <StatCard 
            icon={Clock} 
            label="Pending Review" 
            value={stats.pending}
            color="bg-gradient-to-br from-amber-500 to-orange-500"
          />
          <StatCard 
            icon={TrendingUp} 
            label="Avg Match Score" 
            value={`${stats.avgScore}%`}
            color="bg-gradient-to-br from-emerald-500 to-teal-500"
          />
          <StatCard 
            icon={Sparkles} 
            label="High Match (70%+)" 
            value={stats.highMatch}
            color="bg-gradient-to-br from-blue-500 to-indigo-500"
          />
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ScoreRing 
            total={stats.total} 
            high={stats.highMatch} 
            medium={stats.mediumMatch} 
            low={stats.lowMatch} 
          />
          <DailySubmissions applications={applications} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <TopSkillsChart skills={skillsData.topMatching} type="matching" />
          <TopSkillsChart skills={skillsData.topMissing} type="missing" />
          <ScoreBuckets applications={applications} />
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <RecentActivity applications={applications} />
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-4 card-3d">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 input-3d transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl glass border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent input-3d transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="glass-card rounded-2xl overflow-hidden card-3d">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
              <p className="text-muted-foreground mt-4">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-full glass flex items-center justify-center mx-auto mb-4 btn-3d">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">No Applications Found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your filters" 
                  : "Applications will appear here when students submit their resumes"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30 bg-secondary/20">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Applicant</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Top Skills</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Applied</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <ApplicationRow 
                      key={app.id} 
                      application={app} 
                      onView={setSelectedApp}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {selectedApp && (
        <ApplicationModal 
          application={selectedApp} 
          onClose={() => setSelectedApp(null)} 
        />
      )}
    </main>
  )
}
