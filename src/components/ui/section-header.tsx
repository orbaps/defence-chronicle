import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  centered?: boolean;
}

export function SectionHeader({
  badge,
  title,
  description,
  icon: Icon,
  centered = false,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? "text-center" : ""}`}
    >
      {badge && (
        <div className={`flex items-center gap-2 mb-4 ${centered ? "justify-center" : ""}`}>
          {Icon && <Icon className="w-4 h-4 text-primary" />}
          <span className="badge-public">{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
