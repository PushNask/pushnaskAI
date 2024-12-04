import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { program: 'Business', applications: 1200, acceptanceRate: 75 },
  { program: 'Engineering', applications: 1500, acceptanceRate: 65 },
  { program: 'Medicine', applications: 800, acceptanceRate: 45 },
  { program: 'Arts', applications: 600, acceptanceRate: 85 },
  { program: 'Science', applications: 1000, acceptanceRate: 70 },
];

export const EducationalGuidanceChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Program Applications & Acceptance Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" />
              <YAxis yAxisId="left" orientation="left" stroke="#0EA5E9" />
              <YAxis yAxisId="right" orientation="right" stroke="#8B5CF6" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="applications" fill="#0EA5E9" name="Applications" />
              <Bar yAxisId="right" dataKey="acceptanceRate" fill="#8B5CF6" name="Acceptance Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};