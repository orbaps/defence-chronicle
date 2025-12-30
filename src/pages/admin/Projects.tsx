import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  featured: boolean;
  display_order: number;
}

const categories = ["cybersecurity", "space", "ai", "iot"];

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "cybersecurity",
    tags: "",
    github_url: "",
    live_url: "",
    image_url: "",
    featured: false,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function openDialog(project?: Project) {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description || "",
        category: project.category,
        tags: project.tags?.join(", ") || "",
        github_url: project.github_url || "",
        live_url: project.live_url || "",
        image_url: project.image_url || "",
        featured: project.featured,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        category: "cybersecurity",
        tags: "",
        github_url: "",
        live_url: "",
        image_url: "",
        featured: false,
      });
    }
    setIsDialogOpen(true);
  }

  async function handleSave() {
    if (!formData.title) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        github_url: formData.github_url || null,
        live_url: formData.live_url || null,
        image_url: formData.image_url || null,
        featured: formData.featured,
      };

      if (editingProject) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingProject.id);
        if (error) throw error;
        toast({ title: "Success", description: "Project updated" });
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([{ ...projectData, display_order: projects.length }]);
        if (error) throw error;
        toast({ title: "Success", description: "Project created" });
      }

      setIsDialogOpen(false);
      fetchProjects();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Project deleted" });
      fetchProjects();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground">Manage your portfolio projects</p>
          </div>
          <Button onClick={() => openDialog()} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground mb-4">No projects yet</p>
            <Button onClick={() => openDialog()} variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-tactical rounded-xl border border-border bg-card/50 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      {project.featured && <span className="badge-restricted">Featured</span>}
                      <span className="badge-public capitalize">{project.category}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-muted rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDialog(project)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Project title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project description"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Python, ML, Security"
                />
              </div>
              <div>
                <label className="text-sm font-medium">GitHub URL</label>
                <Input
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded"
                />
                <label className="text-sm font-medium">Featured Project</label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
