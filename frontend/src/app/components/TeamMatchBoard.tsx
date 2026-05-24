import { useState } from "react";
import { Search, Briefcase } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const skillTags = ["All", "Design", "Frontend", "Backend", "Marketing", "Photography"];

const roles = [
  {
    id: 1,
    title: "UI/UX Designer",
    event: "Startup Battle 2026",
    description: "We need a creative designer to craft our pitch deck and app mockups",
    skills: ["Figma", "UI Design", "Branding"],
    contact: "@kutzhokg"
  },
  {
    id: 2,
    title: "Frontend Developer",
    event: "AI Hackathon",
    description: "Looking for React expert to build our ML demo interface",
    skills: ["React", "TypeScript", "Tailwind"],
    contact: "@kutzhokg"
  },
  {
    id: 3,
    title: "Photographer",
    event: "End of Semester Party",
    description: "Capture the best moments of our biggest event of the year",
    skills: ["Photography", "Video", "Editing"],
    contact: "@kutzhokg"
  },
  {
    id: 4,
    title: "Backend Developer",
    event: "University App Project",
    description: "Build scalable APIs for our student services platform",
    skills: ["Node.js", "PostgreSQL", "Docker"],
    contact: "@kutzhokg"
  },
  {
    id: 5,
    title: "Event Host",
    event: "Product Design Masterclass",
    description: "Charismatic speaker to introduce guests and moderate Q&A",
    skills: ["Public Speaking", "Hosting", "Communication"],
    contact: "@kutzhokg"
  }
];

export default function TeamMatchBoard() {
  const [selectedRole, setSelectedRole] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="mb-2">Team Match Board</h1>
          <p className="text-muted-foreground">Join teams that need your skills</p>
        </div>

        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl pb-6 -mt-2 pt-2">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              className="pl-12 h-14 bg-card border-border rounded-3xl backdrop-blur-xl"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {skillTags.map((tag) => (
              <button
                key={tag}
                className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all ${
                  tag === "All"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card/50 text-foreground hover:bg-card backdrop-blur-sm"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {roles.map((role) => (
            <Card
              key={role.id}
              className="p-6 border-border/50 backdrop-blur-xl bg-card/80 hover:bg-card transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 rounded-3xl cursor-pointer"
              onClick={() => setSelectedRole(role)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="mt-1 p-2.5 rounded-xl bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.event}</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/80 mb-4">
                    {role.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="bg-primary/5 text-primary border-primary/20 px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 shadow-lg shadow-primary/30 whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRole(role);
                  }}
                >
                  Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent className="max-w-lg bg-card border-border/50 rounded-3xl">
          <DialogHeader>
            <DialogTitle>{selectedRole?.title}</DialogTitle>
            <p className="text-sm text-muted-foreground">{selectedRole?.event}</p>
          </DialogHeader>

          {selectedRole && (
            <div className="space-y-6 mt-6">
              <div>
                <h4 className="text-sm text-muted-foreground mb-2">Description</h4>
                <p className="text-foreground/80 leading-relaxed">
                  {selectedRole.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm text-muted-foreground mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRole.skills.map((skill: string) => (
                    <Badge
                      key={skill}
                      className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm text-muted-foreground mb-3">Contact</h4>
                <a
                  href={`https://t.me/${selectedRole.contact.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary/10 hover:bg-primary/20 text-primary transition-all"
                >
                  <span>{selectedRole.contact}</span>
                </a>
              </div>

              <Button
                onClick={() => setSelectedRole(null)}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-2xl"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}