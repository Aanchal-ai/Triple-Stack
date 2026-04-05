const stopwords = new Set(["the", "and", "that", "this", "with", "have", "from", "what", "there", "when", "their", "more", "some", "like", "would", "other", "them", "then", "also", "just", "very", "only", "could", "been", "these", "than", "here", "were", "into", "make", "over", "such", "through", "should", "where", "after", "want", "know", "must", "need", "work", "look", "seeking", "seek", "ideal", "years", "skills", "good", "best", "candidate", "role", "job", "position", "company", "team", "join", "part", "experience", "experienced", "knowledge", "understanding", "will", "your", "responsibilities", "requirements", "required", "preferred", "plus", "ability", "able", "strong", "excellent", "great", "high", "highly", "level", "using", "used", "working", "works", "help", "helps", "about", "which", "build", "creating", "create", "write", "writing", "maintain", "maintaining", "support", "supporting", "develop", "developing", "development", "developer", "engineer", "engineering", "environment", "application", "applications", "project", "projects", "business", "practices", "including", "within", "system", "systems", "looking", "duties", "qualifications", "degree", "bachelor", "master", "science", "computer", "related", "field", "equivalent", "bonus", "candidates", "successful", "motivated", "dynamic", "collaborate", "collaborative", "communicate", "communication", "written", "verbal", "interpersonal", "analytical", "think", "thinking", "solve", "details", "oriented", "attention", "focus", "focused", "driven", "passionate", "passion", "love", "enjoy", "thrive", "culture", "benefits", "salary", "compensation", "perks", "health", "dental", "vision", "insurance", "retirement", "plan", "paid", "time", "vacation", "holidays", "sick", "leave", "remote", "flexible", "schedule", "growth", "opportunities", "training", "mentorship", "mentoring", "mentor", "learn", "learning", "continue", "continuous", "improvement", "improve", "contribute", "contribution", "impact", "difference", "growing", "innovative", "leading", "industry", "global", "international", "diverse", "inclusive", "equal", "opportunity", "employer", "please", "apply", "today", "now", "career", "careers", "we're", "you're", "you'll", "they're", "they'll", "we'll", "i'm", "it's", "that's", "there's", "what's", "who's", "let's", "can't", "don't", "won't", "didn't", "isn't", "aren't", "wasn't", "weren't", "hasn't", "haven't", "hadn't", "doesn't", "for", "are", "our", "modern", "similar", "senior", "framework", "frameworks", "management", "state", "backend", "frontend", "stack", "web", "app", "based", "design", "data", "base", "end", "user", "client", "server", "any", "all", "its", "has", "who", "whom", "whose", "why", "how", "building", "built", "provide", "providing", "provides", "new", "old", "day", "days", "month", "months", "year", "yrs", "both", "many", "much", "each", "every", "few", "most", "less", "least", "nice", "familiarity", "testing", "test", "pipelines", "pipeline", "next", "tools", "tool", "technologies", "technology", "process", "processes", "code", "coding", "software", "product", "features", "feature", "hiring", "hire", "intern", "internship", "full", "stack", "fullstack", "full-stack", "developer", "cloud"]);

const shortTechKeywords = new Set(["c", "r", "c++", "c#", "f#", "go", "js", "ts", "ux", "ui", "qa", "ai", "ml", "db", "it", "cs", "sql", "api", "aws", "gcp"]);

export function extractKeywords(text: string): string[] {
  // Allow basic character modifiers important for tech (c++, c#)
  const clean = text.toLowerCase().replace(/[^a-z0-9\s+#-]/g, " ")
  const words = clean.split(/\s+/).filter(w => !stopwords.has(w) && (w.length > 2 || shortTechKeywords.has(w)))
  
  const frequencies = new Map<string, number>()
  for (const w of words) {
    frequencies.set(w, (frequencies.get(w) || 0) + 1)
  }
  
  const sorted = Array.from(frequencies.entries()).sort((a, b) => b[1] - a[1])
  // Return the top 15 distinctive keywords found in the text
  return sorted.slice(0, 15).map(e => e[0])
}

export function analyzeResume(resumeText: string, jobDescription: string) {
  if (!resumeText || !jobDescription) {
     return {
         matchScore: 0,
         matchingSkills: [],
         missingSkills: [],
         breakdown: { skills: 0, experience: 0, keywords: 0 },
         feedback: ["Provide both resume and job description to get insights."],
         roadmap: []
     }
  }

  // Dynamically extract 'requirements' from the provided custom job description
  const jobKeywordsRaw = extractKeywords(jobDescription)
  const jobKeywords = [...new Set([...jobKeywordsRaw])].filter(k => k.length > 0)
  
  if (jobKeywords.length === 0) {
      return { 
        matchScore: 100, 
        matchingSkills: ["No strict keywords found"], 
        missingSkills: [],
        breakdown: { skills: 100, experience: 100, keywords: 100 },
        feedback: ["Job description is too generic. Try a more detailed one."],
        roadmap: [{ day: "Day 1-7", title: "Polish Resume", desc: "Review general ATS best practices." }]
      }
  }

  const resumeLower = resumeText.toLowerCase()
  const matchingSkills = []
  const missingSkills = []
  
  for (const keyword of jobKeywords) {
    // 1. Semantic check for Quantitative Experience (e.g. "4+yrs" compared natively with "5+yrs")
    const expMatch = keyword.match(/^(\d+)\+?(yrs|years?)$/);
    if (expMatch) {
       const reqYears = parseInt(expMatch[1], 10);
       const resumeExpMatches = [...resumeLower.matchAll(/(\d+)\s*\+?\s*(yrs|years?)/g)];
       let maxExp = 0;
       for (const m of resumeExpMatches) {
           maxExp = Math.max(maxExp, parseInt(m[1], 10));
       }
       if (maxExp >= reqYears) {
           matchingSkills.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
       } else {
           missingSkills.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
       }
       continue;
    }

    // 2. Artificial token stemmer: strips suffixes to natively match "solvers" with "solving"
    let stem = keyword;
    if (keyword.length > 6) {
        stem = keyword.replace(/(ing|er|ers|ed|s)$/, "");
    }
    
    // Check if the semantic root exists in the resume
    if (resumeLower.includes(stem)) {
      matchingSkills.push(keyword.charAt(0).toUpperCase() + keyword.slice(1))
    } else {
      missingSkills.push(keyword.charAt(0).toUpperCase() + keyword.slice(1))
    }
  }
  
  const score = Math.round((matchingSkills.length / jobKeywords.length) * 100)
  
  // Fake ATS Breakdown Logic
  const skillsScore = Math.min(100, score + 5);
  const expMatchFound = resumeLower.includes("yrs") || resumeLower.includes("years");
  const experienceScore = expMatchFound ? Math.min(100, score + 15) : Math.max(0, score - 20);
  const keywordsScore = Math.min(100, Math.round(score * 1.1));

  // Human-like AI Review Feedback
  const feedback = [];
  if (!resumeLower.includes("achieved") && !resumeLower.includes("improved") && !resumeLower.includes("%")) {
    feedback.push("Your resume lacks measurable achievements. Try adding data and metrics (e.g., 'improved efficiency by 20%').");
  }
  if (!resumeLower.includes("project") && !resumeLower.includes("portfolio")) {
    feedback.push("Consider adding a dedicated 'Projects' section to showcase practical application of your skills.");
  }
  if (missingSkills.length > 3) {
    feedback.push(`You are heavily missing key technical requirements like ${missingSkills.slice(0, 2).join(" and ")}.`);
  } else if (score > 70) {
    feedback.push("Strong keyword match! Ensure your formatting is ATS-friendly (avoid complex columns or graphics).");
  } else {
    feedback.push("Improve formatting and clearly label sections like 'Experience' and 'Skills'.");
  }

  // Dynamic Career Roadmap based on missing skills
  const roadmap = [];
  if (missingSkills.length > 0) {
    roadmap.push({
      day: "Day 1-3",
      title: `Learn ${missingSkills[0]} basics`,
      desc: `Find a highly-rated crash course and focus on the core fundamentals of ${missingSkills[0]}.`
    });
    roadmap.push({
      day: "Day 4-7",
      title: `Build a mini project`,
      desc: `Apply ${missingSkills[0]} in a practical scenario to prove hands-on capability on your resume.`
    });
    if (missingSkills.length > 1) {
      roadmap.push({
        day: "Week 2",
        title: `Explore ${missingSkills[1]}`,
        desc: `Understand how ${missingSkills[1]} integrates with your current stack.`
      });
      roadmap.push({
        day: "Week 3-4",
        title: "Integrate & Portfolio",
        desc: `Combine ${missingSkills[0]} and ${missingSkills[1]} into a larger portfolio piece.`
      });
    } else {
        roadmap.push({
        day: "Week 2",
        title: "Advanced Concepts",
        desc: `Deep dive into advanced topics and best practices for ${missingSkills[0]}.`
      });
    }
  } else {
    roadmap.push({
      day: "Days 1-7",
      title: "Start Applying",
      desc: "You have a very strong match for this role! Start applying immediately."
    });
    roadmap.push({
      day: "Days 8-14",
      title: "Interview Prep",
      desc: "Focus on behavioral questions and system design or technical deep dives related to the job description."
    });
  }

  return {
    matchScore: score,
    matchingSkills,
    missingSkills,
    breakdown: {
      skills: skillsScore,
      experience: experienceScore,
      keywords: keywordsScore
    },
    feedback,
    roadmap
  }
}
