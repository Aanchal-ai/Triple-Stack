"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles, LayoutDashboard } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow btn-3d">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Match
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="#home" 
              className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group hover-lift"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              href="#features" 
              className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group hover-lift"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group hover-lift"
            >
              How it Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
            <Link 
              href="/dashboard" 
              className="text-muted-foreground hover:text-foreground transition-all duration-300 relative group flex items-center gap-1.5 hover-lift"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-primary-foreground shadow-lg shadow-primary/25 btn-3d btn-ripple animate-glow-pulse"
              asChild
            >
              <Link href="#analyzer">Upload Resume</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 glass rounded-lg btn-3d btn-ripple"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary/10 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4">
              <Link 
                href="#home" 
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 hover-lift"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#features" 
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 hover-lift"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 hover-lift"
                onClick={() => setIsOpen(false)}
              >
                How it Works
              </Link>
              <Link 
                href="/dashboard" 
                className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 flex items-center gap-2 hover-lift"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                Company Dashboard
              </Link>
              <Button 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 w-full text-primary-foreground btn-3d btn-ripple"
                asChild
              >
                <Link href="#analyzer" onClick={() => setIsOpen(false)}>Upload Resume</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
