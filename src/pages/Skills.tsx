import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Code2, Cpu, Globe, Wrench, Database, Shield, Satellite, Cog } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Programming Languages",
    color: "text-primary",
    skills: [
      { name: "Python", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "C", level: 80 },
      { name: "HTML5/CSS3", level: 90 },
      { name: "VHDL", level: 75 },
      { name: "Verilog", level: 70 },
    ],
  },
  {
    icon: Wrench,
    title: "CAD & 3D Printing",
    color: "text-secondary",
    skills: [
      { name: "SOLIDWORKS (CSWA)", level: 95 },
      { name: "3D Modeling", level: 90 },
      { name: "FEA Analysis", level: 80 },
      { name: "Prototyping", level: 85 },
      { name: "Technical Drawing", level: 85 },
    ],
  },
  {
    icon: Satellite,
    title: "Space & Defence",
    color: "text-tactical-blue",
    skills: [
      { name: "Aerospace Engineering", level: 80 },
      { name: "Satellite Design", level: 85 },
      { name: "Drone Technology", level: 80 },
      { name: "Mission Planning", level: 75 },
    ],
  },
  {
    icon: Shield,
    title: "Networking & Security",
    color: "text-tactical-red",
    skills: [
      { name: "TCP/IP", level: 85 },
      { name: "Network Security", level: 90 },
      { name: "System Administration", level: 80 },
      { name: "Penetration Testing", level: 75 },
    ],
  },
  {
    icon: Cpu,
    title: "IoT & Embedded Systems",
    color: "text-tactical-amber",
    skills: [
      { name: "Arduino", level: 90 },
      { name: "Raspberry Pi", level: 85 },
      { name: "MQTT Protocol", level: 80 },
      { name: "Thingsboard", level: 75 },
      { name: "Sensor Integration", level: 85 },
    ],
  },
  {
    icon: Cog,
    title: "Automation & Integration",
    color: "text-primary",
    skills: [
      { name: "n8n", level: 90 },
      { name: "Make.com", level: 85 },
      { name: "Zapier", level: 85 },
      { name: "API Integration", level: 90 },
      { name: "Workflow Design", level: 85 },
    ],
  },
  {
    icon: Database,
    title: "Software & Tools",
    color: "text-secondary",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "MATLAB", level: 80 },
      { name: "Simulink", level: 75 },
      { name: "Figma", level: 70 },
      { name: "Vivado", level: 75 },
    ],
  },
  {
    icon: Globe,
    title: "Cloud & DevOps",
    color: "text-tactical-blue",
    skills: [
      { name: "Docker", level: 80 },
      { name: "IBM Cloud", level: 75 },
      { name: "AWS Basics", level: 70 },
      { name: "CI/CD", level: 75 },
    ],
  },
];

export default function Skills() {
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
              badge="Expertise"
              title="Technical Skills"
              description="A comprehensive overview of my technical capabilities across multiple domains."
            />
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="card-tactical rounded-xl border border-border bg-card/50 p-6 lg:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-lg bg-muted ${category.color}`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
