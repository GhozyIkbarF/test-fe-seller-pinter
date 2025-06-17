import UserProfileFeature from "@/features/User/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "User profile page",
};

const UserProfilePage = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <UserProfileFeature />
    </div>
  );
};

export default UserProfilePage;