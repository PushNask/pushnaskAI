import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import CreditBalance from "@/components/CreditBalance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, CreditCard, History } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const creditHistory = [
    { id: 1, action: "Purchase", amount: 10, date: "2024-04-12" },
    { id: 2, action: "Used", amount: -4, date: "2024-04-11" },
    { id: 3, action: "Purchase", amount: 8, date: "2024-04-10" },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <DashboardHeader />
        <main className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold">Credit Management</h1>
              <p className="text-gray-500">Monitor and manage your service credits</p>
            </div>

            <CreditBalance />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-ocean" />
                    Credit Usage Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Available Credits</span>
                      <span className="font-semibold">10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Used Credits</span>
                      <span className="font-semibold">4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Purchased</span>
                      <span className="font-semibold">14</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5 text-ocean" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {creditHistory.map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                        <div>
                          <p className="font-medium">{transaction.action}</p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                        <span className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} credits
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;