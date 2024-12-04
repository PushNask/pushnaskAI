import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { region: 'North America', visaSuccess: 85, jobPlacement: 80 },
  { region: 'Europe', visaSuccess: 75, jobPlacement: 70 },
  { region: 'Asia', visaSuccess: 70, jobPlacement: 75 },
  { region: 'Africa', visaSuccess: 65, jobPlacement: 60 },
  { region: 'South America', visaSuccess: 60, jobPlacement: 65 },
  { region: 'Oceania', visaSuccess: 80, jobPlacement: 75 },
];

export const GlobalExplorationChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Global Migration Success Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visaSuccess" name="Visa Success Rate %" stroke="#0EA5E9" />
              <Line type="monotone" dataKey="jobPlacement" name="Job Placement Rate %" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};