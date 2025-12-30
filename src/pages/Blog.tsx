import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/section-header";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User, BookOpen } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Understanding SS7 Protocol Vulnerabilities",
    excerpt: "An in-depth analysis of Signaling System 7 vulnerabilities and their implications for critical telecom infrastructure security.",
    category: "Cybersecurity",
    author: "Amarendra Pratap Singh",
    date: "2025-01-15",
    readTime: "8 min read",
    slug: "ss7-protocol-vulnerabilities",
  },
  {
    id: 2,
    title: "CanSat Design: From Concept to Launch",
    excerpt: "My journey designing a CanSat during the Indian Space Labs internship, covering structural design, payload integration, and mission planning.",
    category: "Space Tech",
    author: "Amarendra Pratap Singh",
    date: "2025-01-10",
    readTime: "12 min read",
    slug: "cansat-design-journey",
  },
  {
    id: 3,
    title: "Building AI-Powered Automation with n8n",
    excerpt: "A practical guide to creating intelligent workflow automation using n8n, integrated with AI models for smart decision making.",
    category: "AI/ML",
    author: "Amarendra Pratap Singh",
    date: "2025-01-05",
    readTime: "10 min read",
    slug: "ai-automation-n8n",
  },
  {
    id: 4,
    title: "IoT for Disaster Management: Cloudburst Warning System",
    excerpt: "Technical breakdown of building an IoT-based early warning system for cloudburst detection in vulnerable mountain regions.",
    category: "IoT",
    author: "Amarendra Pratap Singh",
    date: "2024-12-20",
    readTime: "15 min read",
    slug: "iot-cloudburst-warning",
  },
];

export default function Blog() {
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
              badge="Blog"
              title="Technical Articles"
              description="Insights and research on cybersecurity, space technology, AI, and IoT systems."
              icon={BookOpen}
            />
          </motion.div>
        </div>
      </section>

      <section className="pb-20 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group card-tactical rounded-xl border border-border bg-card/50 p-6 lg:p-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge-public">{post.category}</span>
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground">
              More articles coming soon. Stay tuned for in-depth technical content!
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
