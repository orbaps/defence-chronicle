import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MapPin, Shield } from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com/orbaps",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/orbaps",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:amarendrapratapsingh.2004@gmail.com",
    icon: Mail,
    label: "Email",
  },
];

const quickLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/achievements", label: "Achievements" },
  { href: "/certifications", label: "Certifications" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/50">
      {/* Tactical Grid Overlay */}
      <div className="absolute inset-0 tactical-grid opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl">
                <span className="text-primary">Amarendra</span> Pratap Singh
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-6">
              Defence Tech & Space Systems specializing in cybersecurity, 
              VLSI, and AI systems. Currently interning at National Security Guard (NSG) 
              and pursuing B.Tech at Rashtriya Raksha University.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Rashtriya Raksha University, Gujarat, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>+91 88395 51985</p>
              <p>amarendrapratapsingh.2004@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Amarendra Pratap Singh. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="badge-public">Public</span>
            <span className="text-xs text-muted-foreground font-mono">
              SECURE • VERIFIED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
