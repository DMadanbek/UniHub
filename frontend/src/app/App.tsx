import { BrowserRouter, Routes, Route } from "react-router";
import Navigation from "./components/Navigation";
import EventsFeed from "./components/EventsFeed";
import TeamMatchBoard from "./components/TeamMatchBoard";
import StudentProfile from "./components/StudentProfile";
import AIEventCreation from "./components/AIEventCreation";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background dark">
        <Navigation />
        <div className="pb-24 sm:pb-0 sm:pt-16">
          <Routes>
            <Route path="/" element={<EventsFeed />} />
            <Route path="/teams" element={<TeamMatchBoard />} />
            <Route path="/create" element={<AIEventCreation />} />
            <Route path="/profile" element={<StudentProfile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}