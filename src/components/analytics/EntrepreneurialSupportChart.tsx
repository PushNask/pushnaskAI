import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { sector: 'Tech', successRate: 65, avgAmount: 250000 },
  { sector: 'Health', successRate: 55, avgAmount: 180000 },
  { sector: 'Retail', successRate: 45, avgAmount: 120000 },
  { sector: 'Energy', successRate: 70, avgAmount: 300000 },
  { sector: 'Finance', successRate: 60, avgAmount: 280000 },
];

export const EntrepreneurialSupportChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Funding Success & Average Amounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" />
              <YAxis yAxisId="left" orientation="left" stroke="#0EA5E9" />
              <YAxis yAxisId="right" orientation="right" stroke="#8B5CF6" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="successRate" fill="#0EA5E9" name="Success Rate %" />
              <Line yAxisId="right" type="monotone" dataKey="avgAmount" stroke="#8B5CF6" name="Avg Amount ($)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};