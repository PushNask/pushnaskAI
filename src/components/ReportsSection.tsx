import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Search, 
  FileText, 
  Calendar,
  Briefcase,
  Globe,
  GraduationCap,
  Wallet
} from 'lucide-react';

const ReportsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const reports = [
    {
      id: 1,
      title: 'Career Development Strategy Analysis',
      service: 'career',
      date: '2024-04-01',
      summary: 'Comprehensive analysis of career opportunities in the technology sector with focus on AI and Machine Learning roles.',
      status: 'New'
    },
    {
      id: 2,
      title: 'Global Opportunities Assessment - Europe',
      service: 'global',
      date: '2024-03-28',
      summary: 'Detailed evaluation of professional opportunities across European markets with visa requirement analysis.',
      status: 'Read'
    },
    {
      id: 3,
      title: 'Educational Program Recommendations',
      service: 'education',
      date: '2024-03-25',
      summary: 'Analysis of Master\'s programs in Computer Science with scholarship opportunities.',
      status: 'Read'
    },
    {
      id: 4,
      title: 'Startup Funding Guidelines',
      service: 'entrepreneurial',
      date: '2024-03-20',
      summary: 'Strategic approach to securing seed funding for technology startups with market analysis.',
      status: 'Read'
    }
  ];

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'career':
        return <Briefcase className="h-5 w-5" />;
      case 'global':
        return <Globe className="h-5 w-5" />;
      case 'education':
        return <GraduationCap className="h-5 w-5" />;
      case 'entrepreneurial':
        return <Wallet className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const filteredReports = reports
    .filter(report => 
      (selectedService === 'all' || report.service === selectedService) &&
      (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       report.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="w-full space-y-6 p-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold">Advisory Reports</h1>
        <p className="text-gray-500">Access and manage your personalized advisory reports</p>
      </div>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="career">Career Development</SelectItem>
            <SelectItem value="global">Global Exploration</SelectItem>
            <SelectItem value="education">Educational Guidance</SelectItem>
            <SelectItem value="entrepreneurial">Entrepreneurial Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredReports.map(report => (
          <Card key={report.id} className="hover:bg-gray-50 transition-colors">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {getServiceIcon(report.service)}
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(report.date)}</span>
                </div>
              </div>
              {report.status === 'New' && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  New
                </span>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                {report.summary}
              </CardDescription>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  View Report
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-2">
            <FileText className="h-8 w-8 text-gray-400" />
            <p className="text-gray-500">No reports found matching your criteria</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReportsSection;