import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Trash2, Loader2, Shield, UserCog } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

export default function AdminUsers() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newRole, setNewRole] = useState<AppRole>("editor");

  const { data: userRoles, isLoading } = useQuery({
    queryKey: ["admin-user-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select(`
          id,
          user_id,
          role,
          created_at
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: profiles } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      return data;
    },
  });

  const addRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      const { error } = await supabase.from("user_roles").insert({
        user_id: userId,
        role,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-roles"] });
      toast({ title: "Role Assigned", description: "User role has been assigned." });
      setIsDialogOpen(false);
      setNewUserId("");
      setNewRole("editor");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteRoleMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("user_roles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-user-roles"] });
      toast({ title: "Role Removed" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserId) {
      toast({
        title: "Error",
        description: "Please enter a user ID",
        variant: "destructive",
      });
      return;
    }
    addRoleMutation.mutate({ userId: newUserId, role: newRole });
  };

  const getProfileForUser = (userId: string) => {
    return profiles?.find((p) => p.user_id === userId);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage user roles and permissions</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Assign Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign User Role</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">User ID *</label>
                  <Input
                    value={newUserId}
                    onChange={(e) => setNewUserId(e.target.value)}
                    required
                    placeholder="Paste user UUID"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Get the user ID from the profiles table or auth dashboard
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Role *</label>
                  <Select value={newRole} onValueChange={(value: AppRole) => setNewRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin (Full Access)</SelectItem>
                      <SelectItem value="editor">Editor (Content Only)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={addRoleMutation.isPending}>
                    {addRoleMutation.isPending && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Assign Role
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-3 text-sm">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Your User ID</p>
              <code className="text-xs bg-muted px-2 py-1 rounded">{user?.id}</code>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Assigned</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userRoles?.map((role) => {
                  const profile = getProfileForUser(role.user_id);
                  const isCurrentUser = role.user_id === user?.id;
                  return (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {profile?.full_name || profile?.email || "Unknown User"}
                            {isCurrentUser && (
                              <Badge variant="outline" className="ml-2">
                                You
                              </Badge>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {role.user_id.slice(0, 8)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={role.role === "admin" ? "default" : "secondary"}
                          className="gap-1"
                        >
                          {role.role === "admin" ? (
                            <Shield className="w-3 h-3" />
                          ) : (
                            <UserCog className="w-3 h-3" />
                          )}
                          {role.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(role.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteRoleMutation.mutate(role.id)}
                          disabled={deleteRoleMutation.isPending || isCurrentUser}
                          title={isCurrentUser ? "Cannot remove your own role" : "Remove role"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {userRoles?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No user roles assigned yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
