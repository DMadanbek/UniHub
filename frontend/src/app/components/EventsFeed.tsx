import { useState } from "react";
import { Search, Calendar, MapPin, Users, ChevronDown, ChevronUp, Briefcase, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const eventCategories = ["All", "Hackathon", "Workshop", "Lecture", "Party"];

const events = [
  {
    id: 1,
    title: "Startup Battle 2026",
    date: "May 21, 2026",
    time: "18:00",
    location: "A309",
    category: "Hackathon",
    attendees: 45,
    gradient: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1590098563734-bcea80ce34c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "An exciting pitch competition where student entrepreneurs present their innovative startup ideas to a panel of industry experts and investors. Teams will have 5 minutes to pitch, followed by Q&A. Winners receive funding, mentorship, and access to our accelerator program.",
    roles: [
      {
        id: 1,
        title: "UI/UX Designer",
        description: "Design pitch deck and product mockups for the competition",
        tags: ["Design", "Figma", "UI/UX"],
        contact: "@kutzhokg"
      },
      {
        id: 2,
        title: "Frontend Developer",
        description: "Build demo prototype for presentation",
        tags: ["Frontend", "React", "TypeScript"],
        contact: "@kutzhokg"
      },
      {
        id: 3,
        title: "Photographer",
        description: "Capture event highlights and winner announcements",
        tags: ["Photography", "Video", "Editing"],
        contact: "@kutzhokg"
      }
    ]
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    date: "May 25, 2026",
    time: "14:00",
    location: "B201",
    category: "Workshop",
    attendees: 32,
    gradient: "from-blue-500 to-cyan-500",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Learn cutting-edge machine learning techniques and AI applications. This hands-on workshop covers neural networks, deep learning frameworks, and real-world applications. Perfect for students looking to dive into the world of artificial intelligence.",
    roles: [
      {
        id: 4,
        title: "Workshop Assistant",
        description: "Help participants with technical setup and coding exercises",
        tags: ["Teaching", "Python", "ML"],
        contact: "@kutzhokg"
      }
    ]
  },
  {
    id: 3,
    title: "Product Design Masterclass",
    date: "May 27, 2026",
    time: "16:00",
    location: "C105",
    category: "Lecture",
    attendees: 28,
    gradient: "from-orange-500 to-red-500",
    image: "https://images.unsplash.com/photo-1753162656029-781d67c7f6e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Join us for an inspiring masterclass with industry-leading product designers. Learn about design thinking, user research, prototyping, and how to create products that users love. Includes live design critique sessions.",
    roles: [
      {
        id: 5,
        title: "Event Host",
        description: "Introduce speakers and moderate Q&A session",
        tags: ["Host", "Public Speaking", "Communication"],
        contact: "@kutzhokg"
      }
    ]
  },
  {
    id: 4,
    title: "End of Semester Party",
    date: "May 30, 2026",
    time: "20:00",
    location: "Main Hall",
    category: "Party",
    attendees: 120,
    gradient: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1746122072064-3273a25094c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    description: "Celebrate the end of the semester with music, food, and friends! DJ sets, photo booth, refreshments, and surprises throughout the night. Let's make this the best party of the year!",
    roles: [
      {
        id: 6,
        title: "Photographer",
        description: "Capture the best moments of the party",
        tags: ["Photography", "Video", "Social Media"],
        contact: "@kutzhokg"
      },
      {
        id: 7,
        title: "DJ Assistant",
        description: "Help with music setup and take song requests",
        tags: ["Music", "Event Management"],
        contact: "@kutzhokg"
      }
    ]
  }
];

export default function EventsFeed() {
  const navigate = useNavigate();
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"upcoming" | "all">("upcoming");
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [eventsList, setEventsList] = useState(events);

  const toggleExpand = (eventId: number) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const handleDelete = (eventId: number) => {
    setEventsList(eventsList.filter((e) => e.id !== eventId));
    setDeleteEventId(null);
  };

  const groupEventsByDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const grouped: { [key: string]: typeof events } = {};

    eventsList.forEach((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);

      let label = "";
      if (eventDate.getTime() === today.getTime()) {
        label = "Today";
      } else {
        label = event.date.split(",")[0];
      }

      if (!grouped[label]) {
        grouped[label] = [];
      }
      grouped[label].push(event);
    });

    return grouped;
  };

  const sortedEvents = activeTab === "upcoming"
    ? eventsList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : eventsList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <h1 className="mb-2 tracking-wide text-white">ALA-TOO EVENTS</h1>
              <p className="text-foreground/90">Featured and upcoming events from across Ala-Too</p>
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full whitespace-nowrap transition-all text-sm sm:text-base ${
                  activeTab === "upcoming"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card/50 text-foreground hover:bg-card backdrop-blur-sm"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full whitespace-nowrap transition-all text-sm sm:text-base ${
                  activeTab === "all"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card/50 text-foreground hover:bg-card backdrop-blur-sm"
                }`}
              >
                All Events
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-12 h-14 bg-card border-border rounded-3xl backdrop-blur-xl"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {eventCategories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all ${
                  category === "All"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card/50 text-foreground hover:bg-card backdrop-blur-sm"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === "upcoming" ? (
            Object.entries(groupEventsByDate()).map(([dateLabel, dateEvents]) => (
              <div key={dateLabel}>
                <h2 className="mb-4 text-foreground/90">{dateLabel}</h2>
                <div className="space-y-6">
                  {dateEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden border-border/50 backdrop-blur-xl bg-card/80 hover:bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 rounded-3xl relative group"
                    >
                      <div className="absolute top-4 right-4 z-10 flex gap-2">
                        <button
                          onClick={() => navigate("/create", { state: { fromEdit: true } })}
                          className="p-2.5 rounded-xl bg-card/80 backdrop-blur-xl hover:bg-primary/20 text-foreground hover:text-primary transition-all"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteEventId(event.id)}
                          className="p-2.5 rounded-xl bg-card/80 backdrop-blur-xl hover:bg-destructive/20 text-foreground hover:text-destructive transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="h-48 sm:h-56 relative overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>

                      <div className="p-6 sm:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="mb-2">{event.title}</h3>
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                <span>{event.attendees} attending</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                            {event.category}
                          </Badge>
                        </div>

                        <p className={`text-sm text-foreground/70 mb-4 leading-relaxed ${
                          expandedEvent === event.id ? "" : "line-clamp-2"
                        }`}>
                          {event.description}
                        </p>

                        {expandedEvent === event.id && event.roles.length > 0 && (
                          <div className="mb-4 pt-4 border-t border-border/50">
                            <h4 className="mb-3 text-sm">Open Positions</h4>
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                              {event.roles.map((role) => (
                                <button
                                  key={role.id}
                                  onClick={() => setSelectedRole(role)}
                                  className="flex-shrink-0 w-64 p-4 rounded-2xl bg-card/50 hover:bg-card border border-border/50 transition-all text-left"
                                >
                                  <div className="flex items-start gap-3 mb-3">
                                    <div className="p-2 rounded-xl bg-primary/10">
                                      <Briefcase className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h5 className="text-sm mb-1 truncate">{role.title}</h5>
                                      <p className="text-xs text-muted-foreground line-clamp-2">
                                        {role.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {role.tags.slice(0, 3).map((tag: string) => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="bg-primary/5 text-primary border-primary/20 px-2 py-0.5 text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end">
                          <Button
                            onClick={() => toggleExpand(event.id)}
                            variant="ghost"
                            className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-2xl"
                          >
                            {expandedEvent === event.id ? (
                              <>
                                Show Less <ChevronUp className="ml-2 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                Show More <ChevronDown className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            sortedEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden border-border/50 backdrop-blur-xl bg-card/80 hover:bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 rounded-3xl relative group"
              >
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={() => navigate("/create", { state: { fromEdit: true } })}
                    className="p-2.5 rounded-xl bg-card/80 backdrop-blur-xl hover:bg-primary/20 text-foreground hover:text-primary transition-all"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteEventId(event.id)}
                    className="p-2.5 rounded-xl bg-card/80 backdrop-blur-xl hover:bg-destructive/20 text-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="h-48 sm:h-56 relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-2">{event.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5">
                      {event.category}
                    </Badge>
                  </div>

                  <p className={`text-sm text-foreground/70 mb-4 leading-relaxed ${
                    expandedEvent === event.id ? "" : "line-clamp-2"
                  }`}>
                    {event.description}
                  </p>

                  {expandedEvent === event.id && event.roles.length > 0 && (
                    <div className="mb-4 pt-4 border-t border-border/50">
                      <h4 className="mb-3 text-sm">Open Positions</h4>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                        {event.roles.map((role) => (
                          <button
                            key={role.id}
                            onClick={() => setSelectedRole(role)}
                            className="flex-shrink-0 w-64 p-4 rounded-2xl bg-card/50 hover:bg-card border border-border/50 transition-all text-left"
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <div className="p-2 rounded-xl bg-primary/10">
                                <Briefcase className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-sm mb-1 truncate">{role.title}</h5>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                  {role.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {role.tags.slice(0, 3).map((tag: string) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="bg-primary/5 text-primary border-primary/20 px-2 py-0.5 text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      onClick={() => toggleExpand(event.id)}
                      variant="ghost"
                      className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-2xl"
                    >
                      {expandedEvent === event.id ? (
                        <>
                          Show Less <ChevronUp className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show More <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent className="max-w-lg bg-card border-border/50 rounded-3xl">
          <DialogHeader>
            <DialogTitle>{selectedRole?.title}</DialogTitle>
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
                  {selectedRole.tags.map((tag: string) => (
                    <Badge
                      key={tag}
                      className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5"
                    >
                      {tag}
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

      <Dialog open={deleteEventId !== null} onOpenChange={() => setDeleteEventId(null)}>
        <DialogContent className="max-w-md bg-card border-border/50 rounded-3xl">
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-foreground/80">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setDeleteEventId(null)}
              variant="outline"
              className="flex-1 h-12 rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteEventId && handleDelete(deleteEventId)}
              variant="destructive"
              className="flex-1 h-12 rounded-2xl"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}