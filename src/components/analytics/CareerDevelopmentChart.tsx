import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { region: 'North America', rate: 75 },
  { region: 'Europe', rate: 68 },
  { region: 'Asia', rate: 82 },
  { region: 'Africa', rate: 45 },
  { region: 'South America', rate: 55 },
  { region: 'Oceania', rate: 63 },
];

export const CareerDevelopmentChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Career Growth Rates by Region</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#0EA5E9" name="Growth Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};