import { Bell, Settings, User } from "lucide-react";
import { Button } from "./ui/button";

const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="PushNask" className="h-8" />
        <h1 className="text-xl font-semibold text-gray-800">PushNask</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5 text-gray-600" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;