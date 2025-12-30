import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Achievement {
  id: string;
  title: string;
  event: string | null;
  organization: string | null;
  category: string;
  level: string | null;
  date: string | null;
  location: string | null;
  description: string | null;
  badge: string | null;
  verified: boolean;
}

const categories = ["competition", "leadership", "extracurricular"];

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Achievement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    event: "",
    organization: "",
    category: "competition",
    level: "",
    date: "",
    location: "",
    description: "",
    badge: "",
    verified: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function openDialog(item?: Achievement) {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        event: item.event || "",
        organization: item.organization || "",
        category: item.category,
        level: item.level || "",
        date: item.date || "",
        location: item.location || "",
        description: item.description || "",
        badge: item.badge || "",
        verified: item.verified,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        event: "",
        organization: "",
        category: "competition",
        level: "",
        date: "",
        location: "",
        description: "",
        badge: "",
        verified: false,
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
      const data = {
        title: formData.title,
        event: formData.event || null,
        organization: formData.organization || null,
        category: formData.category,
        level: formData.level || null,
        date: formData.date || null,
        location: formData.location || null,
        description: formData.description || null,
        badge: formData.badge || null,
        verified: formData.verified,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("achievements")
          .update(data)
          .eq("id", editingItem.id);
        if (error) throw error;
        toast({ title: "Success", description: "Achievement updated" });
      } else {
        const { error } = await supabase
          .from("achievements")
          .insert([{ ...data, display_order: achievements.length }]);
        if (error) throw error;
        toast({ title: "Success", description: "Achievement created" });
      }

      setIsDialogOpen(false);
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from("achievements").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Achievement deleted" });
      fetchData();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Achievements</h1>
            <p className="text-muted-foreground">Manage your awards and recognitions</p>
          </div>
          <Button onClick={() => openDialog()} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Achievement
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground mb-4">No achievements yet</p>
            <Button onClick={() => openDialog()} variant="outline">
              Add Your First Achievement
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {achievements.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-tactical rounded-xl border border-border bg-card/50 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      {item.badge && <span className="badge-restricted">{item.badge}</span>}
                      <span className="badge-public capitalize">{item.category}</span>
                    </div>
                    <p className="text-primary text-sm">{item.event}</p>
                    <p className="text-muted-foreground text-sm">{item.organization}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => openDialog(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Event</label>
                <Input
                  value={formData.event}
                  onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Organization</label>
                <Input
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Level</label>
                  <Input
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="National, University, etc."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Badge</label>
                  <Input
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="1st Place, AIR 167, etc."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="2025"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
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
