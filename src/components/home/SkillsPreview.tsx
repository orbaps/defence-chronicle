import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Cpu, Globe, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const skillCategories = [
  {
    icon: Code2,
    title: "Programming",
    skills: ["Python", "Node.js", "C", "VHDL", "Verilog"],
  },
  {
    icon: Settings,
    title: "CAD & Design",
    skills: ["SOLIDWORKS", "3D Printing", "FEA", "Prototyping"],
  },
  {
    icon: Cpu,
    title: "IoT & Embedded",
    skills: ["Arduino", "Raspberry Pi", "MQTT", "Thingsboard"],
  },
  {
    icon: Globe,
    title: "Automation",
    skills: ["n8n", "Make.com", "Zapier", "API Integration"],
  },
];

export function SkillsPreview() {
  return (
    <section className="py-20 lg:py-32 relative tactical-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          badge="Expertise"
          title="Technical Skills"
          description="A comprehensive toolkit spanning programming, hardware design, and system automation."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-tactical rounded-xl border border-border bg-card/50 p-6 text-center"
            >
              <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-sm text-muted-foreground">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/skills">
              View Full Skill Matrix
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
