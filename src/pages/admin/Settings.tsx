import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SettingItem {
  id?: string;
  key: string;
  value: string;
}

const defaultSettings: SettingItem[] = [
  { key: "site_title", value: "" },
  { key: "site_description", value: "" },
  { key: "contact_email", value: "" },
  { key: "social_github", value: "" },
  { key: "social_linkedin", value: "" },
  { key: "social_twitter", value: "" },
];

export default function AdminSettings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<SettingItem[]>(defaultSettings);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const { data: existingSettings, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .order("key");
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (existingSettings) {
      const mergedSettings = defaultSettings.map((defaultSetting) => {
        const existing = existingSettings.find((s) => s.key === defaultSetting.key);
        return existing
          ? { id: existing.id, key: existing.key, value: existing.value || "" }
          : defaultSetting;
      });

      // Add any custom settings not in defaults
      existingSettings.forEach((setting) => {
        if (!defaultSettings.find((d) => d.key === setting.key)) {
          mergedSettings.push({
            id: setting.id,
            key: setting.key,
            value: setting.value || "",
          });
        }
      });

      setSettings(mergedSettings);
    }
  }, [existingSettings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      for (const setting of settings) {
        if (setting.id) {
          const { error } = await supabase
            .from("site_settings")
            .update({ value: setting.value })
            .eq("id", setting.id);
          if (error) throw error;
        } else if (setting.value) {
          const { error } = await supabase
            .from("site_settings")
            .insert({ key: setting.key, value: setting.value });
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast({ title: "Settings Saved", description: "All settings have been updated." });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase.from("site_settings").insert({ key, value });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      setNewKey("");
      setNewValue("");
      toast({ title: "Setting Added" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteSettingMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("site_settings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast({ title: "Setting Deleted" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value } : s))
    );
  };

  const handleAddSetting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKey || !newValue) return;
    addSettingMutation.mutate({ key: newKey, value: newValue });
  };

  const getLabel = (key: string) => {
    const labels: Record<string, string> = {
      site_title: "Site Title",
      site_description: "Site Description",
      contact_email: "Contact Email",
      social_github: "GitHub URL",
      social_linkedin: "LinkedIn URL",
      social_twitter: "Twitter/X URL",
    };
    return labels[key] || key;
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Site Settings</h1>
            <p className="text-muted-foreground">Configure global site settings</p>
          </div>
          <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
            {saveMutation.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save All
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic site configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings
                .filter((s) => s.key.startsWith("site_"))
                .map((setting) => (
                  <div key={setting.key}>
                    <label className="text-sm font-medium">{getLabel(setting.key)}</label>
                    {setting.key === "site_description" ? (
                      <Textarea
                        value={setting.value}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                        rows={3}
                      />
                    ) : (
                      <Input
                        value={setting.value}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                      />
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact & Social</CardTitle>
              <CardDescription>Contact information and social links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings
                .filter((s) => s.key.startsWith("contact_") || s.key.startsWith("social_"))
                .map((setting) => (
                  <div key={setting.key}>
                    <label className="text-sm font-medium">{getLabel(setting.key)}</label>
                    <Input
                      value={setting.value}
                      onChange={(e) => updateSetting(setting.key, e.target.value)}
                    />
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Settings</CardTitle>
              <CardDescription>Add custom key-value settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings
                .filter(
                  (s) =>
                    !s.key.startsWith("site_") &&
                    !s.key.startsWith("contact_") &&
                    !s.key.startsWith("social_")
                )
                .map((setting) => (
                  <div key={setting.key} className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="text-sm font-medium">{setting.key}</label>
                      <Input
                        value={setting.value}
                        onChange={(e) => updateSetting(setting.key, e.target.value)}
                      />
                    </div>
                    {setting.id && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteSettingMutation.mutate(setting.id!)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

              <form onSubmit={handleAddSetting} className="flex gap-2 pt-4 border-t">
                <Input
                  placeholder="Setting key"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                />
                <Input
                  placeholder="Value"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
                <Button type="submit" disabled={addSettingMutation.isPending}>
                  <Plus className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
