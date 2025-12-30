import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Award, Calendar, ExternalLink, CheckCircle, Building2 } from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "technical", label: "Technical" },
  { id: "professional", label: "Professional" },
  { id: "academic", label: "Academic" },
];

const certifications = [
  {
    id: 1,
    title: "SOLIDWORKS CAD Design Associate (CSWA)",
    issuer: "Dassault Systèmes",
    category: "professional",
    date: "2025",
    description: "Certified associate-level proficiency in SOLIDWORKS CAD software, demonstrating skills in 3D modeling, assemblies, and technical drawings.",
    verified: true,
    verifyUrl: "https://cv.virtualtester.com/qr/?b=SLDWRKS&i=C-XXXXXXXXXXX",
    skills: ["3D Modeling", "Assembly Design", "Technical Drawing", "FEA"],
    color: "text-secondary",
  },
  {
    id: 2,
    title: "Wireless Application Protocol (WAP)",
    issuer: "Europe Academy",
    category: "technical",
    date: "2025",
    description: "Certification in wireless application protocols, covering mobile communication standards and network architectures.",
    verified: true,
    skills: ["Wireless Protocols", "Mobile Networks", "Communication Systems"],
    color: "text-primary",
  },
  {
    id: 3,
    title: "3D Printing Specialist",
    issuer: "Technical Institution",
    category: "technical",
    date: "2025",
    description: "Specialized certification in additive manufacturing technologies, covering FDM, SLA, and material selection for prototyping.",
    verified: true,
    skills: ["FDM Printing", "SLA Technology", "Material Science", "Prototyping"],
    color: "text-tactical-amber",
  },
  {
    id: 4,
    title: "ML Decode Hackathon",
    issuer: "Hackathon Organization",
    category: "academic",
    date: "2025",
    description: "Participation certificate for ML Decode Hackathon, demonstrating machine learning skills and collaborative problem-solving.",
    verified: true,
    skills: ["Machine Learning", "Data Science", "Team Collaboration"],
    color: "text-primary",
  },
  {
    id: 5,
    title: "IoT Fundamentals",
    issuer: "Online Learning Platform",
    category: "technical",
    date: "2024",
    description: "Comprehensive certification covering Internet of Things fundamentals, sensor integration, and cloud connectivity.",
    verified: true,
    skills: ["IoT Architecture", "Sensors", "Cloud Integration", "MQTT"],
    color: "text-tactical-blue",
  },
  {
    id: 6,
    title: "Python for Data Science",
    issuer: "Online Learning Platform",
    category: "technical",
    date: "2024",
    description: "Certification in Python programming for data science applications, including pandas, numpy, and visualization libraries.",
    verified: true,
    skills: ["Python", "Data Analysis", "Visualization", "NumPy"],
    color: "text-primary",
  },
];

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCertifications = certifications.filter(
    (cert) => activeCategory === "all" || cert.category === activeCategory
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
              badge="Credentials"
              title="Certifications"
              description="Professional certifications and credentials validating technical expertise."
              icon={Award}
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
            {filteredCertifications.map((cert, index) => (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group card-tactical rounded-xl border border-border bg-card/50 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-muted ${cert.color}`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    {cert.verified && (
                      <div className="flex items-center gap-1 text-primary text-xs">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Verified
                      </div>
                    )}
                    <span className="badge-public capitalize">{cert.category}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Building2 className="w-4 h-4" />
                  {cert.issuer}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs font-medium rounded bg-muted text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    {cert.date}
                  </div>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verify
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
