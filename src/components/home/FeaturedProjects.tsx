import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github, Lock, Rocket, Bot, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const projects = [
  {
    id: 1,
    title: "SS7 Security Research",
    description: "Comprehensive vulnerability analysis of SS7 telecom protocols with defense strategies for critical infrastructure protection.",
    category: "Cybersecurity",
    icon: Lock,
    tags: ["Telecom", "Security", "Research"],
    color: "text-tactical-red",
  },
  {
    id: 2,
    title: "FINSY_AGENT",
    description: "Automated invoice processing and risk assessment workflows powered by IBM Cloud and AI/ML technologies.",
    category: "AI/ML",
    icon: Bot,
    tags: ["IBM Cloud", "Docker", "AI/ML"],
    github: "https://github.com/orbaps",
    color: "text-primary",
  },
  {
    id: 3,
    title: "CanSat & CubeSat Design",
    description: "Miniaturized satellite systems designed for space missions, developed during Indian Space Labs internship.",
    category: "Space Tech",
    icon: Rocket,
    tags: ["SOLIDWORKS", "Aerospace", "CAD"],
    color: "text-secondary",
  },
  {
    id: 4,
    title: "Cloudburst Early Warning",
    description: "IoT-based real-time weather monitoring system with disaster alert capabilities for vulnerable regions.",
    category: "IoT",
    icon: Wifi,
    tags: ["IoT", "Real-Time", "Monitoring"],
    color: "text-tactical-amber",
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge="Projects"
          title="Featured Work"
          description="Highlights from my work in cybersecurity, space technology, AI systems, and IoT."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group card-tactical rounded-xl border border-border bg-card/50 p-6 lg:p-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-muted ${project.color}`}>
                  <project.icon className="w-6 h-6" />
                </div>
                <span className="badge-public">{project.category}</span>
              </div>

              <h3 className="text-xl lg:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground"
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
                    className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                <Link
                  to="/projects"
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link to="/projects">
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
