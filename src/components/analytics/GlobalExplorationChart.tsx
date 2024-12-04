import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: 'Jan', visaSuccess: 75, placement: 65 },
  { month: 'Feb', visaSuccess: 78, placement: 68 },
  { month: 'Mar', visaSuccess: 82, placement: 70 },
  { month: 'Apr', visaSuccess: 80, placement: 72 },
  { month: 'May', visaSuccess: 85, placement: 75 },
  { month: 'Jun', visaSuccess: 88, placement: 78 },
];

export const GlobalExplorationChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Visa & Placement Success Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visaSuccess" stroke="#0EA5E9" name="Visa Success %" />
              <Line type="monotone" dataKey="placement" stroke="#8B5CF6" name="Placement Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};