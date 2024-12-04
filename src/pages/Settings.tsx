import { useState } from "react";
import { Language, FileText, XOctagon, Link2, User, LogOut } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const invoices = [
    { date: "2024-04-15", total: "$49.99", status: "Paid", id: "INV-001" },
    { date: "2024-03-15", total: "$29.99", status: "Paid", id: "INV-002" },
    { date: "2024-02-15", total: "$39.99", status: "Paid", id: "INV-003" },
  ];

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    toast({
      title: "Language Updated",
      description: "Your language preference has been saved.",
    });
  };

  const handleCancelCredits = () => {
    toast({
      title: "Cancellation Request",
      description: "Your credit cancellation request has been submitted.",
    });
  };

  const handleLogout = (allDevices: boolean) => {
    toast({
      title: "Logging Out",
      description: allDevices ? "Logging out from all devices..." : "Logging out...",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Cannot Delete Account",
      description: "Please cancel your PushNask Credits first.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader />
        <main className="p-6 space-y-8">
          {/* Language Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Language className="h-5 w-5" />
              Language
            </h2>
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </section>

          {/* Billing Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Billing
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.total}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          {/* Cancellation Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <XOctagon className="h-5 w-5" />
              Cancellation
            </h2>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <span>Cancel Credits</span>
              <Button variant="destructive" onClick={handleCancelCredits}>
                Cancel
              </Button>
            </div>
          </section>

          {/* Referral Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Referral
            </h2>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <input
                type="text"
                value="https://pushnask.com/ref/user123"
                readOnly
                className="flex-1 p-2 bg-gray-50 border rounded"
              />
              <Button variant="secondary">Copy Link</Button>
            </div>
          </section>

          {/* Account Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Account
            </h2>
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <span>Log out of all devices</span>
                <Button variant="outline" onClick={() => handleLogout(true)}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out All
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span>Log out</span>
                <Button variant="outline" onClick={() => handleLogout(false)}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-gray-500 mb-4">
                  To delete your account, please cancel your PushNask Credits first.
                </p>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="w-full"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Settings;