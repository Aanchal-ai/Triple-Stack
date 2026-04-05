"use client"

export interface Application {
  id: string
  student_name: string
  email: string
  resume_text: string | null
  job_description: string
  match_score: number | null
  matching_skills: string[] | null
  missing_skills: string[] | null
  status: string
  created_at: string
}

const STORAGE_KEY = "analyzer_applications"

function generateSeedData(): Application[] {
  const seed: Application[] = []
  const today = new Date()
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    
    const score = 50 + Math.floor(Math.random() * 40);
    seed.push({
      id: Math.random().toString(36).substring(7),
      student_name: `User ${i+1}`,
      email: `user${i+1}@example.com`,
      resume_text: "Sample resume text based on customizable extraction.",
      job_description: "Sample job description seeking specific skills.",
      match_score: score,
      matching_skills: ["Communication", "Leadership", "Organization"],
      missing_skills: ["Management", "Planning"],
      status: score >= 75 ? "accepted" : (score < 60 ? "rejected" : "pending"),
      created_at: d.toISOString()
    })
  }
  return seed
}

export function getApplications(): Application[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) {
    const seed = generateSeedData()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    return seed
  }
  
  // Retroactive history migration script
  let apps = JSON.parse(data) as Application[];
  let migrated = false;
  
  apps = apps.map(app => {
      const score = app.match_score || 0;
      const computedStatus = score >= 75 ? "accepted" : (score < 60 ? "rejected" : "pending");
      
      if (app.status !== computedStatus) {
          migrated = true;
          return { ...app, status: computedStatus };
      }
      return app;
  });
  
  if (migrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  }
  
  return apps;
}

export function saveApplication(app: Application) {
  if (typeof window === "undefined") return
  const current = getApplications()
  localStorage.setItem(STORAGE_KEY, JSON.stringify([app, ...current]))
}
