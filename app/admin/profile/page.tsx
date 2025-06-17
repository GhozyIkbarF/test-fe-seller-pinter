import UserProfileFeature from "@/features/User/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "User profile page",
};

const UserProfilePage = () => {
  return <UserProfileFeature />
};

export default UserProfilePage;