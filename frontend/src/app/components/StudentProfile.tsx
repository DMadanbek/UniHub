import { useState } from "react";
import { Github, Send, Mail, Edit, X, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const allSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "UI/UX Design",
  "Figma",
  "Python",
  "Machine Learning",
  "Photography",
  "Video Editing",
  "Public Speaking",
  "Marketing",
  "Content Writing",
  "Graphic Design"
];

export default function StudentProfile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [name, setName] = useState("Sofia Kowalski");
  const [course, setCourse] = useState("Computer Science");
  const [year, setYear] = useState("3rd Year");
  const [telegram, setTelegram] = useState("@sofiakowalski");
  const [github, setGithub] = useState("sofia-kow");
  const [email, setEmail] = useState("sofia.k@uni.edu");
  const [skillSearch, setSkillSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([
    "React",
    "TypeScript",
    "Node.js",
    "UI/UX Design",
    "Figma",
    "Python",
    "Machine Learning",
    "Photography",
    "Video Editing",
    "Public Speaking"
  ]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const filteredSkills = skillSearch
    ? selectedSkills.filter((skill) =>
        skill.toLowerCase().includes(skillSearch.toLowerCase())
      )
    : selectedSkills;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Card className="border-border/50 backdrop-blur-xl bg-card/80 rounded-3xl overflow-hidden relative">
          <button
            onClick={() => setIsEditOpen(true)}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-primary/10 hover:bg-primary/20 text-primary transition-all"
          >
            <Edit className="h-5 w-5" />
          </button>

          <div className="p-8 sm:p-12">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="flex items-center gap-2 mb-2">
                <h1>{name}</h1>
                {isAvailable && (
                  <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 px-3 py-1">
                    Активист
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-6">
                {course} • {year}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card/50 hover:bg-card border border-border/50 transition-all"
                >
                  <Send className="h-4 w-4 text-primary" />
                  <span className="text-sm">{telegram}</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card/50 hover:bg-card border border-border/50 transition-all"
                >
                  <Github className="h-4 w-4 text-primary" />
                  <span className="text-sm">{github}</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-card/50 hover:bg-card border border-border/50 transition-all"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">{email}</span>
                </a>
              </div>
            </div>

            <div className="border-t border-border/50 pt-8">
              <div className="flex items-center justify-between mb-4">
                <h3>Skills & Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-primary/5 text-primary border-primary/20 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border/50 rounded-3xl">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-2xl bg-muted/30 border-muted"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Course</label>
                  <Input
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="h-12 rounded-2xl bg-muted/30 border-muted"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Year</label>
                  <Input
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="h-12 rounded-2xl bg-muted/30 border-muted"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Telegram</label>
                <Input
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  className="h-12 rounded-2xl bg-muted/30 border-muted"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">GitHub</label>
                <Input
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="h-12 rounded-2xl bg-muted/30 border-muted"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-2xl bg-muted/30 border-muted"
                />
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 rounded-3xl">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h4 className="mb-1 text-foreground">Available for events</h4>
                  <p className="text-sm text-muted-foreground">
                    Show "Активист" badge on your profile
                  </p>
                </div>
                <Switch
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            </Card>

            <div>
              <label className="text-sm text-muted-foreground mb-3 block">Skills & Interests</label>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search skills..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="pl-10 h-10 bg-background/50 border-border rounded-2xl"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {allSkills
                  .filter((skill) =>
                    skill.toLowerCase().includes(skillSearch.toLowerCase())
                  )
                  .map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedSkills.includes(skill)
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
              </div>
            </div>

            <Button
              onClick={() => setIsEditOpen(false)}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-2xl"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}