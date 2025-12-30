import { motion } from "framer-motion";
import { Shield, Rocket, Users, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

const experiences = [
  {
    id: 1,
    title: "NSG Intern",
    organization: "National Security Guard HQ NBDC",
    period: "Nov 2025 - Present",
    description: "Working on classified defence technology projects at India's elite counter-terrorism force.",
    icon: Shield,
    current: true,
  },
  {
    id: 2,
    title: "Space Technology Intern",
    organization: "Indian Space Labs",
    period: "Dec 2024 - Jan 2025",
    description: "Selected AIR 167 nationally. Worked on CanSat, CubeSat design, drone technology, and air taxi R&D.",
    icon: Rocket,
    achievement: "AIR 167",
  },
  {
    id: 3,
    title: "Volunteer Coordinator",
    organization: "Tech Horizons Club, RRU",
    period: "2025 - Present",
    description: "Leading technology initiatives and organizing technical events at the university level.",
    icon: Users,
  },
];

export function ExperienceTimeline() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Experience"
          title="Professional Journey"
          description="Key roles in defence, space technology, and academic leadership."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-4 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary via-border to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative pl-12 lg:pl-0 pb-12 last:pb-0 ${
                index % 2 === 0 ? "lg:pr-[calc(50%+2rem)] lg:text-right" : "lg:pl-[calc(50%+2rem)]"
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-2.5 lg:left-1/2 lg:-translate-x-1/2 w-3 h-3 rounded-full border-2 border-primary bg-background ${
                  exp.current ? "animate-pulse-glow" : ""
                }`}
              />

              <div className={`card-tactical rounded-xl border border-border bg-card/50 p-6 ${
                index % 2 === 0 ? "lg:mr-0" : "lg:ml-0"
              }`}>
                <div className={`flex items-center gap-3 mb-3 ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}>
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <exp.icon className="w-5 h-5" />
                  </div>
                  {exp.current && (
                    <span className="badge-public">Current</span>
                  )}
                  {exp.achievement && (
                    <span className="badge-restricted">{exp.achievement}</span>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                <p className="text-primary font-medium mb-2">{exp.organization}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </p>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
