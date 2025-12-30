import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Calendar, MapPin, ExternalLink, Users, Music } from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "competition", label: "Competitions" },
  { id: "leadership", label: "Leadership" },
  { id: "extracurricular", label: "Extracurricular" },
];

const achievements = [
  {
    id: 1,
    title: "Runner-Up - Product Breakdown",
    event: "E-Summit 2025",
    organization: "IIT Indore",
    category: "competition",
    level: "National",
    date: "2025",
    location: "IIT Indore",
    description: "Secured second position in the national-level Product Breakdown competition at E-Summit, demonstrating product analysis and business strategy skills.",
    icon: Trophy,
    badge: "2nd Place",
    color: "text-tactical-amber",
  },
  {
    id: 2,
    title: "Winner - AI Treasure Hunt",
    event: "AI Treasure Hunt 2025",
    organization: "Rashtriya Raksha University",
    category: "competition",
    level: "University",
    date: "2025",
    location: "RRU, Gujarat",
    description: "First place in the AI-based treasure hunt competition, showcasing problem-solving abilities with artificial intelligence and machine learning.",
    icon: Trophy,
    badge: "1st Place",
    color: "text-primary",
  },
  {
    id: 3,
    title: "AIR 167 - Space Technology Selection",
    event: "Indian Space Labs Program",
    organization: "Indian Space Labs",
    category: "competition",
    level: "National",
    date: "Dec 2024",
    location: "India",
    description: "Selected among top 167 candidates nationally for the prestigious Space Technology internship program, working on CanSat, CubeSat design, and drone technology.",
    icon: Medal,
    badge: "AIR 167",
    color: "text-secondary",
  },
  {
    id: 4,
    title: "AIR 90 - National Science Olympiad",
    event: "NSO 2022",
    organization: "Science Olympiad Foundation",
    category: "competition",
    level: "National",
    date: "2022",
    location: "India",
    description: "Achieved All India Rank 90 in the National Science Olympiad, demonstrating excellence in scientific reasoning and problem-solving.",
    icon: Medal,
    badge: "AIR 90",
    color: "text-secondary",
  },
  {
    id: 5,
    title: "2nd Position - Essay Writing",
    event: "SICISSL Competition",
    organization: "Rashtriya Raksha University",
    category: "competition",
    level: "University",
    date: "2024",
    location: "RRU, Gujarat",
    description: "Secured second position in essay writing competition on topics related to internal security and strategic studies.",
    icon: Award,
    badge: "2nd Place",
    color: "text-tactical-amber",
  },
  {
    id: 6,
    title: "Security Team Lead - Coldplay Concert",
    event: "Coldplay Music of the Spheres World Tour",
    organization: "Event Management",
    category: "leadership",
    level: "Major Event",
    date: "2025",
    location: "Narendra Modi Stadium, Ahmedabad",
    description: "Led security operations for the massive Coldplay concert with over 50,000 attendees at Narendra Modi Stadium, ensuring crowd safety and event security.",
    icon: Users,
    badge: "50,000+ Attendees",
    color: "text-tactical-red",
  },
  {
    id: 7,
    title: "Security Coordinator - IPL Event",
    event: "Indian Premier League",
    organization: "IPL Event Management",
    category: "leadership",
    level: "Major Event",
    date: "2025",
    location: "Gujarat",
    description: "Coordinated security operations for IPL matches, managing crowd control and safety protocols for high-profile sporting events.",
    icon: Users,
    badge: "IPL 2025",
    color: "text-tactical-red",
  },
  {
    id: 8,
    title: "RRU Cricket Team Member",
    event: "University Sports",
    organization: "Rashtriya Raksha University",
    category: "extracurricular",
    level: "University",
    date: "2024 - Present",
    location: "RRU, Gujarat",
    description: "Active member of the university cricket team, representing RRU in inter-university cricket tournaments.",
    icon: Award,
    color: "text-primary",
  },
  {
    id: 9,
    title: "Guitar & Chess Enthusiast",
    event: "Personal Interests",
    organization: "Hobbies",
    category: "extracurricular",
    level: "Personal",
    date: "Ongoing",
    description: "Passionate guitar player and chess enthusiast, balancing technical pursuits with creative and strategic hobbies.",
    icon: Music,
    color: "text-muted-foreground",
  },
];

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredAchievements = achievements.filter(
    (achievement) => activeCategory === "all" || achievement.category === activeCategory
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
              badge="Recognition"
              title="Achievements & Awards"
              description="Competition wins, leadership roles, and extracurricular accomplishments."
              icon={Trophy}
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
            {filteredAchievements.map((achievement, index) => (
              <motion.article
                key={achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group card-tactical rounded-xl border border-border bg-card/50 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-muted ${achievement.color}`}>
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {achievement.badge && (
                      <span className="badge-restricted">{achievement.badge}</span>
                    )}
                    <span className="badge-public">{achievement.level}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {achievement.title}
                </h3>

                <p className="text-primary text-sm font-medium mb-1">{achievement.event}</p>
                <p className="text-muted-foreground text-sm mb-4">{achievement.organization}</p>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {achievement.description}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {achievement.date}
                  </div>
                  {achievement.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {achievement.location}
                    </div>
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
