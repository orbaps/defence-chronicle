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

interface Certification {
  id: string;
  title: string;
  issuer: string;
  category: string;
  date: string | null;
  description: string | null;
  skills: string[];
  verified: boolean;
  verify_url: string | null;
}

const categories = ["technical", "professional", "academic"];

export default function AdminCertifications() {
  const [items, setItems] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Certification | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    category: "technical",
    date: "",
    description: "",
    skills: "",
    verified: true,
    verify_url: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function openDialog(item?: Certification) {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        issuer: item.issuer,
        category: item.category,
        date: item.date || "",
        description: item.description || "",
        skills: item.skills?.join(", ") || "",
        verified: item.verified,
        verify_url: item.verify_url || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        issuer: "",
        category: "technical",
        date: "",
        description: "",
        skills: "",
        verified: true,
        verify_url: "",
      });
    }
    setIsDialogOpen(true);
  }

  async function handleSave() {
    if (!formData.title || !formData.issuer) {
      toast({ title: "Error", description: "Title and Issuer required", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    try {
      const data = {
        title: formData.title,
        issuer: formData.issuer,
        category: formData.category,
        date: formData.date || null,
        description: formData.description || null,
        skills: formData.skills.split(",").map((s) => s.trim()).filter(Boolean),
        verified: formData.verified,
        verify_url: formData.verify_url || null,
      };

      if (editingItem) {
        const { error } = await supabase.from("certifications").update(data).eq("id", editingItem.id);
        if (error) throw error;
        toast({ title: "Success", description: "Certification updated" });
      } else {
        const { error } = await supabase.from("certifications").insert([{ ...data, display_order: items.length }]);
        if (error) throw error;
        toast({ title: "Success", description: "Certification created" });
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
      const { error } = await supabase.from("certifications").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Certification deleted" });
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
            <h1 className="text-3xl font-bold mb-2">Certifications</h1>
            <p className="text-muted-foreground">Manage your credentials</p>
          </div>
          <Button onClick={() => openDialog()} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Certification
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground mb-4">No certifications yet</p>
            <Button onClick={() => openDialog()} variant="outline">Add First Certification</Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {items.map((item, index) => (
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
                      {item.verified && <span className="badge-public">Verified</span>}
                    </div>
                    <p className="text-primary text-sm">{item.issuer}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.skills?.map((skill) => (
                        <span key={skill} className="px-2 py-1 text-xs bg-muted rounded">{skill}</span>
                      ))}
                    </div>
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
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Certification" : "Add Certification"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Issuer *</label>
                <Input value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="2025" />
              </div>
              <div>
                <label className="text-sm font-medium">Skills (comma-separated)</label>
                <Input value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2} />
              </div>
              <div>
                <label className="text-sm font-medium">Verification URL</label>
                <Input value={formData.verify_url} onChange={(e) => setFormData({ ...formData, verify_url: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={formData.verified} onChange={(e) => setFormData({ ...formData, verified: e.target.checked })} className="rounded" />
                <label className="text-sm font-medium">Verified</label>
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
