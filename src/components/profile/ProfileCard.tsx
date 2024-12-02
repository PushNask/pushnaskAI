import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const ProfileCard = ({ title, description, icon, href }: ProfileCardProps) => {
  return (
    <Link to={href}>
      <Card className="h-full transition-all hover:shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default ProfileCard;