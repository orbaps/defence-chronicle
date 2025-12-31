import { motion } from "framer-motion";
import { Shield, Rocket, Users, Calendar, Award } from "lucide-react";
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

const recognitions = [
  { id: 1, title: "Runner Up - Product Breakdown", detail: "E Summit 2025, IIT Indore (National Level)" },
  { id: 2, title: "Winner - AI Treasure Hunt", detail: "RRU (2025)" },
  { id: 3, title: "Indian Space Labs Internship Selection - AIR 167", detail: "(National)" },
  { id: 4, title: "National Science Olympiad (NSO)", detail: "2022 - AIR 90" },
  { id: 5, title: "2nd Position - Essay Writing Competition", detail: "SICISSL (RRU)" },
  { id: 6, title: "Certificate of Participation - ML Decode Hackathon", detail: "2025" },
  { id: 7, title: "SOLIDWORKS CAD Design Associate (CSWA)", detail: "Dassault Systèmes (2025)" },
  { id: 8, title: "Wireless Application Protocol (WAP)", detail: "Europe Academy (2025)" },
  { id: 9, title: "3D Printing Specialist", detail: "Technical Institution (2025)" },
  { id: 10, title: "Trackshift Finalist", detail: "Finalist" },
  { id: 11, title: "Avishkar Finalist", detail: "Finalist" },
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

          {/* Recognition & Certifications */}
          <div className="mt-12 max-w-3xl mx-auto">
            <SectionHeader
              badge="Recognition"
              title="Recognition & Certifications"
              description="Awards, selections, and certifications earned over time."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {recognitions.map((r) => (
                <div key={r.id} className="card-tactical rounded-lg border border-border bg-card/50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{r.title}</div>
                      {r.detail && <div className="text-xs text-muted-foreground mt-1">{r.detail}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
