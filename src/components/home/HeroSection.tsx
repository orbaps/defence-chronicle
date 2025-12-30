import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Shield, Cpu, Satellite, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "AIR 167", sublabel: "Space Labs" },
  { label: "NSG", sublabel: "Active Intern" },
  { label: "CSWA", sublabel: "Certified" },
];

const expertiseAreas = [
  { icon: Lock, label: "Cybersecurity" },
  { icon: Satellite, label: "Space Tech" },
  { icon: Cpu, label: "AI Systems" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 tactical-grid opacity-40" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="status-online pl-4 text-sm font-medium text-primary">
              Active NSG Intern
            </span>
            <span className="badge-public">Defence Sector</span>
          </motion.div>

          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4">
              <span className="text-foreground">Amarendra</span>
              <br />
              <span className="text-primary text-glow">Pratap Singh</span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-6 font-light"
          >
            Defence Tech & Space Systems Engineer
          </motion.p>

          {/* Expertise Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {expertiseAreas.map((area, index) => (
              <div
                key={area.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm"
              >
                <area.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{area.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-2xl mb-8 leading-relaxed"
          >
            Electronics Engineering (VLSI) student at Rashtriya Raksha University, 
            an Institute of National Importance under MHA. Building secure systems 
            at the intersection of defence, space, and artificial intelligence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button size="lg" className="gap-2 btn-tactical" asChild>
              <Link to="/projects">
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="/resume.pdf" download>
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Shield Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute right-10 bottom-10 lg:right-20 lg:bottom-20 hidden md:block"
      >
        <Shield className="w-48 h-48 lg:w-72 lg:h-72 text-primary" />
      </motion.div>

      {/* Scan Line Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
      </div>
    </section>
  );
}
