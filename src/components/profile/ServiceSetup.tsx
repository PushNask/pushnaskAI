import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EducationalGuidanceForm from "../services/forms/EducationalGuidanceForm";

const ServiceSetup = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Service Setup</h1>
      
      <Tabs defaultValue="education" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="education">Educational Guidance</TabsTrigger>
          <TabsTrigger value="entrepreneurial">Entrepreneurial Support</TabsTrigger>
          <TabsTrigger value="career">Career Development</TabsTrigger>
          <TabsTrigger value="global">Global Exploration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="education">
          <EducationalGuidanceForm />
        </TabsContent>
        
        <TabsContent value="entrepreneurial">
          <div className="text-center py-8 text-muted-foreground">
            Form coming soon...
          </div>
        </TabsContent>
        
        <TabsContent value="career">
          <div className="text-center py-8 text-muted-foreground">
            Form coming soon...
          </div>
        </TabsContent>
        
        <TabsContent value="global">
          <div className="text-center py-8 text-muted-foreground">
            Form coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceSetup;