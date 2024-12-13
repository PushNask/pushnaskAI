import { ProfileForm } from "@/components/profile/ProfileForm";

const ProfileSetup = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ProfileForm title="Complete Your Profile" />
      </div>
    </div>
  );
};

export default ProfileSetup;