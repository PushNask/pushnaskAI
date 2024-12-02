import { useState } from "react";
import { User, FileText, Settings } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ProfileCard from "@/components/profile/ProfileCard";
import CVCreator from "@/components/profile/CVCreator";
import ServiceSetup from "@/components/profile/ServiceSetup";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const profileCards = [
    {
      title: "Profile Management",
      description: "Update your personal information and preferences",
      icon: <User className="h-5 w-5" />,
      href: "/profile/edit",
    },
    {
      title: "Create a CV",
      description: "Create and manage your professional CV",
      icon: <FileText className="h-5 w-5" />,
      href: "/profile/cv",
    },
    {
      title: "Service Setup",
      description: "Configure your preferences for different services",
      icon: <Settings className="h-5 w-5" />,
      href: "/profile/services",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {profileCards.map((card) => (
                <ProfileCard key={card.title} {...card} />
              ))}
            </div>
            
            {activeSection === 'cv' && <CVCreator />}
            {activeSection === 'services' && <ServiceSetup />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;