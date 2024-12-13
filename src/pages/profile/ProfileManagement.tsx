import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProfileForm } from "@/components/profile/ProfileForm";

const ProfileManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Button>
      </div>

      <ProfileForm title="Profile Management" />
    </div>
  );
};

export default ProfileManagement;