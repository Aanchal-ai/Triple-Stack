import Link from "next/link"
import { Sparkles, Github, Twitter, Linkedin, LayoutDashboard } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-primary/10 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Match
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-4">
              AI-powered resume analysis tool that helps you land your dream job by 
              matching your skills with job requirements instantly.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <Link 
                href="https://github.com" 
                target="_blank"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:neon-glow"
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:neon-glow"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link 
                href="https://linkedin.com" 
                target="_blank"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:neon-glow"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#analyzer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Try Demo
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Match. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Built with Next.js, Supabase & AI
          </p>
        </div>
      </div>
    </footer>
  )
}
