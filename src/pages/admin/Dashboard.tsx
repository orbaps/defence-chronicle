import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Folder,
  Trophy,
  Award,
  MessageSquare,
  Eye,
  TrendingUp,
  Users,
  FileText,
} from "lucide-react";

interface DashboardStats {
  projects: number;
  achievements: number;
  certifications: number;
  messages: number;
  unreadMessages: number;
  blogPosts: number;
}

export default function AdminDashboard() {
  const { user, role } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    achievements: 0,
    certifications: 0,
    messages: 0,
    unreadMessages: 0,
    blogPosts: 0,
  });
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          projectsResult,
          achievementsResult,
          certificationsResult,
          messagesResult,
          unreadResult,
          blogResult,
        ] = await Promise.all([
          supabase.from("projects").select("id", { count: "exact", head: true }),
          supabase.from("achievements").select("id", { count: "exact", head: true }),
          supabase.from("certifications").select("id", { count: "exact", head: true }),
          supabase.from("contact_messages").select("id", { count: "exact", head: true }),
          supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false),
          supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        ]);

        setStats({
          projects: projectsResult.count || 0,
          achievements: achievementsResult.count || 0,
          certifications: certificationsResult.count || 0,
          messages: messagesResult.count || 0,
          unreadMessages: unreadResult.count || 0,
          blogPosts: blogResult.count || 0,
        });

        // Fetch recent messages
        const { data: messages } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        setRecentMessages(messages || []);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    { icon: Folder, label: "Projects", value: stats.projects, color: "text-primary" },
    { icon: Trophy, label: "Achievements", value: stats.achievements, color: "text-tactical-amber" },
    { icon: Award, label: "Certifications", value: stats.certifications, color: "text-secondary" },
    { icon: FileText, label: "Blog Posts", value: stats.blogPosts, color: "text-primary" },
    { icon: MessageSquare, label: "Messages", value: stats.messages, badge: stats.unreadMessages, color: "text-tactical-green" },
  ];

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your portfolio content and recent activity.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-tactical rounded-xl border border-border bg-card/50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.badge !== undefined && stat.badge > 0 && (
                  <span className="badge-restricted">{stat.badge} new</span>
                )}
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-tactical rounded-xl border border-border bg-card/50 p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
          
          {recentMessages.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No messages yet. They'll appear here when someone contacts you.
            </p>
          ) : (
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border ${
                    message.read ? "border-border bg-background/50" : "border-primary/30 bg-primary/5"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{message.name}</p>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </div>
                    {!message.read && (
                      <span className="badge-public">New</span>
                    )}
                  </div>
                  <p className="text-sm font-medium mb-1">{message.subject}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(message.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}
