import { MessageSquare, FileText, Home, User, Settings, BarChart2, Menu } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: MessageSquare, label: "AI Advisor", href: "/ai-advisor" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: Home, label: "Credits & Services", href: "/dashboard" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: BarChart2, label: "Analytics", href: "/analytics" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-20 
        ${isOpen ? "w-64" : "w-0"}`}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/d6c1b7f9-1b2c-4735-bc20-5db0396c8a64.png" alt="PushNask" className="h-8" />
          {isOpen && <span className="font-semibold text-gray-800">PushNask</span>}
        </div>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      <nav className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors mb-1
              ${location.pathname === item.href ? 'bg-gray-100' : ''}`}
          >
            <item.icon className="h-5 w-5" />
            {isOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;