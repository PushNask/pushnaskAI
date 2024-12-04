import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { region: 'North America', opportunities: 75, growth: 85 },
  { region: 'Europe', opportunities: 68, growth: 75 },
  { region: 'Asia', opportunities: 82, growth: 90 },
  { region: 'Africa', opportunities: 45, growth: 65 },
  { region: 'South America', opportunities: 55, growth: 70 },
  { region: 'Oceania', opportunities: 63, growth: 80 },
];

export const CareerAnalyticsChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Global Career Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="opportunities" name="Available Positions" fill="#0EA5E9" />
              <Bar dataKey="growth" name="Growth Rate %" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};