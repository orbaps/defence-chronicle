import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { User, MapPin, Calendar, Mail, Phone, GraduationCap, Briefcase, Award } from "lucide-react";

const education = [
  {
    degree: "B.Tech - Electronics (VLSI)",
    institution: "Rashtriya Raksha University, Gujarat",
    note: "An Institute of National Importance, MHA",
    period: "2024 - 2028",
    status: "Ongoing",
  },
  {
    degree: "Higher Secondary Education (Class XII)",
    institution: "St. Francis H.S.S., Bilaspur, Chhattisgarh",
    period: "2023",
    score: "77.4%",
  },
  {
    degree: "Secondary Education (Class X)",
    institution: "St. Francis H.S.S., Bilaspur, Chhattisgarh",
    period: "2021",
    score: "92.6%",
  },
];

const interests = [
  "Cybersecurity & Ethical Hacking",
  "Space Technology & Aerospace",
  "Artificial Intelligence & Machine Learning",
  "VLSI Design & Embedded Systems",
  "Defence Technology Innovation",
  "IoT & Smart Systems",
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-12 lg:pt-32 lg:pb-20 relative hero-gradient">
        <div className="absolute inset-0 tactical-grid opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-square max-w-md mx-auto rounded-2xl border border-border bg-card/50 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-32 h-32 text-muted-foreground/30" />
                </div>
                {/* Status Badge */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="status-online pl-3 text-sm font-medium">Active</span>
                      <span className="badge-public">NSG Intern</span>
                    </div>
                    <p className="text-sm text-muted-foreground">National Security Guard HQ</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <span className="badge-public mb-4 inline-block">About Me</span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Amarendra <span className="text-primary">Pratap Singh</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Defence Tech & Space Systems
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I am an Electronics Engineering (VLSI) student at Rashtriya Raksha University, 
                Gujarat — an Institute of National Importance under the Ministry of Home Affairs. 
                Currently serving as an intern at the National Security Guard (NSG) Headquarters, 
                I work at the intersection of defence technology, cybersecurity, and space systems.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                My journey includes being selected AIR 167 for Indian Space Labs, where I worked on 
                CanSat, CubeSat design, and drone technology. I'm passionate about building secure, 
                mission-critical systems that serve national interests.
              </p>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm">amarendrapratapsingh.2004@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-sm">+91 88395 51985</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm">Gandhi Nagar, Gujarat</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-sm">Available for Projects</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Education"
            title="Academic Background"
            icon={GraduationCap}
          />

          <div className="grid gap-6 max-w-3xl">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card-tactical rounded-xl border border-border bg-card/50 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                    <p className="text-primary">{edu.institution}</p>
                    {edu.note && (
                      <p className="text-sm text-muted-foreground mt-1">{edu.note}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                    {edu.status && (
                      <span className="block badge-public mt-2">{edu.status}</span>
                    )}
                    {edu.score && (
                      <span className="block text-primary font-semibold mt-2">{edu.score}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="py-20 relative tactical-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            badge="Research"
            title="Areas of Interest"
            icon={Award}
            centered
          />

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {interests.map((interest, index) => (
              <motion.div
                key={interest}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="px-6 py-3 rounded-full border border-border bg-card/50 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
              >
                <span className="text-sm font-medium">{interest}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
