import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Lock, Rocket, Bot, Wifi, Folder } from "lucide-react";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "space", label: "Space Tech" },
  { id: "ai", label: "AI/ML" },
  { id: "iot", label: "IoT" },
];

const projects = [
  {
    id: 1,
    title: "SS7 Security Research",
    description: "Comprehensive vulnerability analysis of SS7 telecom protocols with defense strategies for critical infrastructure protection. Research on signaling system vulnerabilities and mitigation techniques.",
    category: "cybersecurity",
    icon: Lock,
    tags: ["Telecom", "Security", "Research", "Critical Infrastructure"],
    color: "text-tactical-red",
    featured: true,
  },
  {
    id: 2,
    title: "Secure Data Wiping Tool",
    description: "Cross-platform secure file deletion utility following NIST and DoD standards. Implements multiple overwrite patterns for military-grade data sanitization.",
    category: "cybersecurity",
    icon: Lock,
    tags: ["NIST", "DoD Standards", "Cross-Platform", "Security"],
    color: "text-tactical-red",
  },
  {
    id: 3,
    title: "FINSY_AGENT",
    description: "Automated invoice processing and risk assessment workflows powered by IBM Cloud and AI/ML technologies. Streamlines financial operations with intelligent document analysis.",
    category: "ai",
    icon: Bot,
    tags: ["IBM Cloud", "Docker", "AI/ML", "Automation"],
    github: "https://github.com/orbaps",
    color: "text-primary",
    featured: true,
  },
  {
    id: 4,
    title: "MedFlow",
    description: "Healthcare supply chain management system with AI-powered demand forecasting. Optimizes medical inventory and reduces waste through predictive analytics.",
    category: "ai",
    icon: Bot,
    tags: ["Healthcare", "AI/ML", "Supply Chain", "Forecasting"],
    github: "https://github.com/orbaps",
    color: "text-primary",
  },
  {
    id: 5,
    title: "AegisAI",
    description: "Autonomous FinTech support agent providing intelligent customer assistance. Leverages NLP for query understanding and automated resolution.",
    category: "ai",
    icon: Bot,
    tags: ["FinTech", "NLP", "Full-Stack", "Chatbot"],
    github: "https://github.com/orbaps",
    color: "text-primary",
  },
  {
    id: 6,
    title: "Recruit AI",
    description: "Machine learning-powered candidate matching system for recruitment. Analyzes resumes and job descriptions to find optimal candidate-role fits.",
    category: "ai",
    icon: Bot,
    tags: ["Python", "ML", "HR Tech", "NLP"],
    github: "https://github.com/orbaps",
    color: "text-primary",
  },
  {
    id: 7,
    title: "CanSat & CubeSat Design",
    description: "Miniaturized satellite systems designed for space missions during Indian Space Labs internship. Includes structural design, payload integration, and mission planning.",
    category: "space",
    icon: Rocket,
    tags: ["SOLIDWORKS", "Aerospace", "CAD", "Satellite"],
    color: "text-secondary",
    featured: true,
  },
  {
    id: 8,
    title: "Drone & Air Taxi R&D",
    description: "Research and development on drone technology and urban air mobility solutions. Focus on autonomous navigation and safety systems.",
    category: "space",
    icon: Rocket,
    tags: ["Drones", "UAV", "Autonomous", "R&D"],
    color: "text-secondary",
  },
  {
    id: 9,
    title: "Cloudburst Early Warning System",
    description: "IoT-based real-time weather monitoring system with disaster alert capabilities. Deployed for vulnerable regions prone to flash floods and cloudbursts.",
    category: "iot",
    icon: Wifi,
    tags: ["IoT", "Real-Time", "Weather", "Disaster Management"],
    color: "text-tactical-amber",
    featured: true,
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  return (
    <Layout>
      <section className="pt-20 pb-12 lg:pt-32 lg:pb-20 relative hero-gradient">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              badge="Portfolio"
              title="Projects & Research"
              description="A collection of my work in cybersecurity, space technology, AI systems, and IoT solutions."
              icon={Folder}
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`group card-tactical rounded-xl border border-border bg-card/50 p-6 ${
                  project.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-muted ${project.color}`}>
                    <project.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    {project.featured && <span className="badge-restricted">Featured</span>}
                    <span className="badge-public capitalize">{project.category}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium rounded bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
