import { Calendar, Briefcase, User, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router";

const navItems = [
  { icon: Calendar, label: "Events", path: "/" },
  { icon: Briefcase, label: "Teams", path: "/teams" },
  { icon: Sparkles, label: "Create", path: "/create" }
];

export default function Navigation() {
  const location = useLocation();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden sm:block fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="text-xl font-semibold tracking-tight">
                <span className="text-white">Ala-Too</span> <span className="text-primary">UniHub</span>
              </div>
            </Link>

            {/* Center Navigation */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm ${
                      isActive
                        ? "text-foreground bg-muted/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Profile */}
            <Link
              to="/profile"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                location.pathname === "/profile"
                  ? "text-foreground bg-muted/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <User className="h-4 w-4" />
              <span className="text-sm">Profile</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-2xl border-t border-border/50">
        <div className="flex items-center justify-around h-20 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
              location.pathname === "/profile"
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-card/50"
            }`}
          >
            <User className={`h-5 w-5 ${location.pathname === "/profile" ? "text-primary" : ""}`} />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
}