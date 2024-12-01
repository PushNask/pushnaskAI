import { Bell, Settings, User } from "lucide-react";
import { Button } from "./ui/button";

const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <img src="/lovable-uploads/b563a053-c835-4b5c-bd58-fc56d8bef471.png" alt="PushNask" className="h-8" />
        <h1 className="text-xl font-semibold text-gray-800">PushNask</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-ocean text-[10px] text-white rounded-full flex items-center justify-center">
            3
          </span>
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