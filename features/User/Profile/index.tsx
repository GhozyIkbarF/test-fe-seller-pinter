"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGetUserProfile } from "@/useCases/UserUserCases";
import { cn } from "@/lib/utils";

const UserProfileFeature = () => {
  const { data: user } = useGetUserProfile();
  const path = usePathname();
  const isAdminSide = path.startsWith("/admin");
  return (
    <div className={cn("bg-white w-full p-6 rounded-lg", isAdminSide && "h-screen")}>
      <div className="px-6 py-4 space-y-9 max-w-[400px] mx-auto text-slate-900">
        <h1 className="text-center font-semibold text-xl">User Profile</h1>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-16 h-16">
              <AvatarFallback className="text-sm font-medium text-blue-900 bg-blue-200">
                {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
          </Avatar>
          <table className="w-full table-fixed border-separate border-spacing-y-2">
            <tbody className="font-semibold">
              <tr className="bg-gray-100 rounded-lg">
                <td className="px-4 py-2 w-20">
                  Username
                </td>
                <td className="px-4 py-2 w-2/12 text-center">:</td>
                <td className="px-4 py-2 text-center">{user?.username}</td>
              </tr>
              <tr className="bg-gray-100 rounded-lg">
                <td className="px-4 py-2 w-20">
                  Password
                </td>
                <td className="px-4 py-2 w-2/12 text-center">:</td>
                <td className="px-4 py-2 text-center">12345678</td>
              </tr>
              <tr className="bg-gray-100 rounded-lg">
                <td className="px-4 py-2 w-20">Role</td>
                <td className="px-4 py-2 w-2/12 text-center">:</td>
                <td className="px-4 py-2 text-center">{user?.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link href={isAdminSide ? "/admin" : "/"} className="w-full">
          <Button type="button" variant="secondary" className="w-full">
            Back to {isAdminSide ? "Dashboard" : "Home"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfileFeature;
