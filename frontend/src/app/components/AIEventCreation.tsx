import { useState, useEffect } from "react";
import { Sparkles, Calendar, MapPin, Briefcase, Plus, X, Clock, Upload, Image as ImageIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { motion } from "motion/react";

const availableTags = [
  "Hackathon",
  "Workshop",
  "Lecture",
  "Party",
  "Entrepreneurship",
  "Competition",
  "Networking",
  "Technology",
  "Design",
  "Business",
  "Sports",
  "Music",
  "Art",
  "Science",
  "Career",
  "Social"
];

interface Role {
  title: string;
  description: string;
  skills: string[];
  contact: string;
}

export default function AIEventCreation() {
  const navigate = useNavigate();
  const locationState = useLocation();
  const [step, setStep] = useState<"choice" | "input" | "review">("choice");
  const [creationMode, setCreationMode] = useState<"ai" | "manual" | null>(null);
  const [prompt, setPrompt] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({ title: "", description: "", skills: "", contact: "" });

  // Check if we came from EventsFeed for editing
  useEffect(() => {
    const state = locationState.state as { fromEdit?: boolean } | null;
    if (state?.fromEdit) {
      setStep("review");
      setCreationMode("manual");
    }
  }, [locationState]);

  const handleAICreate = () => {
    setCreationMode("ai");
    setStep("input");
  };

  const handleManualCreate = () => {
    setCreationMode("manual");
    setStep("review");
  };

  const handleGenerate = () => {
    if (prompt.trim()) {
      setTitle("Startup Battle 2026");
      setDescription("An exciting pitch competition where student entrepreneurs present their innovative startup ideas to a panel of industry experts and investors. Teams will have 5 minutes to pitch, followed by Q&A. Winners receive funding, mentorship, and access to our accelerator program.");
      setDate("Friday, May 23, 2026");
      setTime("18:00 - 22:00");
      setLocation("A309");
      setImageUrl("https://images.unsplash.com/photo-1590098563734-bcea80ce34c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080");
      setSelectedTags(["Hackathon", "Entrepreneurship", "Competition", "Networking"]);
      setRoles([
        {
          title: "UI/UX Designer",
          description: "Design pitch deck and product mockups",
          skills: ["Figma", "UI Design", "Branding"],
          contact: "@kutzhokg"
        },
        {
          title: "Frontend Developer",
          description: "Build demo prototype for presentation",
          skills: ["React", "TypeScript", "Tailwind"],
          contact: "@kutzhokg"
        },
        {
          title: "Photographer",
          description: "Capture event highlights and winner announcements",
          skills: ["Photography", "Video", "Editing"],
          contact: "@kutzhokg"
        }
      ]);
      setStep("review");
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddRole = () => {
    if (newRole.title && newRole.description && newRole.contact) {
      setRoles([
        ...roles,
        {
          title: newRole.title,
          description: newRole.description,
          skills: newRole.skills.split(",").map((s) => s.trim()).filter(Boolean),
          contact: newRole.contact
        }
      ]);
      setNewRole({ title: "", description: "", skills: "", contact: "" });
      setIsRoleModalOpen(false);
    }
  };

  const handleRemoveRole = (index: number) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setStep("choice");
    setCreationMode(null);
    setPrompt("");
    setTitle("");
    setDescription("");
    setDate("");
    setTime("");
    setLocation("");
    setImageUrl("");
    setSelectedTags([]);
    setRoles([]);
  };

  if (step === "choice") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl text-center"
        >
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 mb-6">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-3">Create Your Event</h1>
            <p className="text-muted-foreground text-lg">
              Choose how you want to create your event
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Button
              onClick={handleAICreate}
              className="h-48 bg-gradient-to-br from-purple-500 via-primary to-pink-500 hover:from-purple-600 hover:via-primary/90 hover:to-pink-600 text-white rounded-3xl shadow-2xl shadow-primary/40 transition-all hover:shadow-primary/60 hover:scale-[1.02] flex flex-col gap-4"
            >
              <Sparkles className="h-12 w-12" />
              <div>
                <div className="text-xl mb-1">Create with AI</div>
                <div className="text-sm opacity-90">Let AI generate the details</div>
              </div>
            </Button>

            <Button
              onClick={handleManualCreate}
              variant="outline"
              className="h-48 bg-card/50 hover:bg-card border-border/50 text-foreground rounded-3xl transition-all hover:scale-[1.02] flex flex-col gap-4"
            >
              <Plus className="h-12 w-12" />
              <div>
                <div className="text-xl mb-1">Create by myself</div>
                <div className="text-sm text-muted-foreground">Fill in all the details manually</div>
              </div>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === "input" && creationMode === "ai") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl text-center"
        >
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 mb-6">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-3">Describe Your Event</h1>
            <p className="text-muted-foreground text-lg">
              Tell us about your event and AI will handle the rest
            </p>
          </div>

          <Card className="p-8 sm:p-12 border-border/50 backdrop-blur-xl bg-card/80 rounded-3xl">
            <div className="space-y-6">
              <Input
                placeholder="e.g., Startup battle on Friday"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="h-16 px-6 text-lg bg-background/50 border-border rounded-3xl"
              />

              <div className="flex gap-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1 h-16 rounded-3xl border-border/50"
                >
                  Back
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim()}
                  className="flex-[2] h-16 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-3xl shadow-2xl shadow-primary/40 transition-all hover:shadow-primary/60 hover:scale-[1.02]"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate with AI
                </Button>
              </div>
            </div>
          </Card>

          <p className="mt-6 text-sm text-muted-foreground">
            AI will generate event description, tags, and team roles
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="mb-2">
                {creationMode === "ai" ? "Review Generated Event" : "Edit and publish your event"}
              </h1>
              <p className="text-muted-foreground">
                {creationMode === "ai" ? "Edit and publish your event" : "Fill in event details"}
              </p>
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              className="rounded-2xl border-border/50"
            >
              Start Over
            </Button>
          </div>

          <Card className="p-8 border-border/50 backdrop-blur-xl bg-card/80 rounded-3xl">
            <div className="space-y-6">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Event Image (16:9 recommended)</label>
                {imageUrl ? (
                  <div className="relative group">
                    <img
                      src={imageUrl}
                      alt="Event preview"
                      className="w-full h-48 sm:h-64 object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <Button
                        onClick={() => setImageUrl("")}
                        variant="destructive"
                        className="rounded-2xl"
                      >
                        Remove Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-border rounded-2xl p-12 text-center bg-background/50 cursor-pointer hover:border-primary/50 transition-all block">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-foreground mb-2">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">
                      Recommended aspect ratio: 16:9 (e.g., 1920x1080)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setImageUrl(url);
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Event Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
                  className="h-14 px-4 text-lg bg-background/50 border-border rounded-2xl"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your event"
                  className="min-h-32 px-4 py-3 bg-background/50 border-border rounded-2xl resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="May 23, 2026"
                      className="h-12 pl-12 bg-background/50 border-border rounded-2xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="18:00 - 22:00"
                      className="h-12 pl-12 bg-background/50 border-border rounded-2xl"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="A309"
                      className="h-12 pl-12 bg-background/50 border-border rounded-2xl"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-3 block">Event Tags</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {availableTags.slice(0, 8).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                          selectedTags.includes(tag)
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {availableTags.slice(8).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                          selectedTags.includes(tag)
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>Team Roles</h3>
              <Button
                onClick={() => setIsRoleModalOpen(true)}
                className="bg-primary/10 hover:bg-primary/20 text-primary rounded-2xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>

            {roles.length === 0 ? (
              <Card className="p-12 border-border/50 border-dashed backdrop-blur-xl bg-card/50 rounded-3xl text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No roles added yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Click "Add Role" to create team positions
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {roles.map((role, index) => (
                  <Card
                    key={index}
                    className="p-6 border-border/50 backdrop-blur-xl bg-card/80 rounded-3xl relative group"
                  >
                    <button
                      onClick={() => handleRemoveRole(index)}
                      className="absolute top-4 right-4 p-2 rounded-xl hover:bg-destructive text-destructive hover:text-white transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2.5 rounded-xl bg-primary/10">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 pr-12">
                        <h4 className="mb-1">{role.title}</h4>
                        <p className="text-sm text-foreground/70 mb-3">{role.description}</p>
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
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={() => navigate("/")}
            className="w-full h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-3xl shadow-xl shadow-primary/30"
          >
            Publish Event
          </Button>
        </motion.div>
      </div>

      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent className="max-w-lg bg-card border-border/50 rounded-3xl">
          <DialogHeader>
            <DialogTitle>Add Team Role</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Role Title</label>
              <Input
                value={newRole.title}
                onChange={(e) => setNewRole({ ...newRole, title: e.target.value })}
                placeholder="e.g., UI/UX Designer"
                className="h-12 rounded-2xl bg-background/50"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Description</label>
              <Textarea
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                placeholder="Describe the role responsibilities"
                className="min-h-24 rounded-2xl bg-background/50 resize-none"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Tags for Search (comma-separated)
              </label>
              <Input
                value={newRole.skills}
                onChange={(e) => setNewRole({ ...newRole, skills: e.target.value })}
                placeholder="e.g., Design, Photography, Host"
                className="h-12 rounded-2xl bg-background/50"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Examples: Design, Frontend, Backend, Photography, Host, Marketing
              </p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Telegram Contact
              </label>
              <Input
                value={newRole.contact}
                onChange={(e) => setNewRole({ ...newRole, contact: e.target.value })}
                placeholder="@username"
                className="h-12 rounded-2xl bg-background/50"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => {
                  setIsRoleModalOpen(false);
                  setNewRole({ title: "", description: "", skills: "", contact: "" });
                }}
                variant="outline"
                className="flex-1 h-12 rounded-2xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddRole}
                disabled={!newRole.title || !newRole.description || !newRole.contact}
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white rounded-2xl"
              >
                Add Role
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}