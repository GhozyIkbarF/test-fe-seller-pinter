"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";
import TopNavbar from "./navbar";
import { setUser } from "@/store/slices/authSlice";
import { useGetUserProfile } from "@/useCases/UserUserCases";
import Image from "next/image";
import Logo2 from "@/public/Logo2.svg";
import { usePathname } from "next/navigation";
import Footer from "./footer";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: userProfile, isLoading } = useGetUserProfile();

  const pathname = usePathname();
  const isAdminSide = pathname.includes("/admin");
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userProfile) {
      dispatch(setUser(userProfile));
      if (pathname.includes("/admin") && userProfile.role !== "Admin") {
        router.push("/");
      }
    }
  }, [userProfile]);

  if (isLoading && isAdminSide) {
    return (
      <div className="flex items-center justify-center h-screen text-black">
        <Image src={Logo2} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return isAdminSide ? (
    <div className="relative flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-[267px] relative flex-1 flex flex-col">
        <TopNavbar setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col lg:flex-row mt-6">
          <div className="flex-1 p-6 pt-20">{children}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative flex flex-col justify-between min-h-screen bg-white">
      <TopNavbar />
        <div className="mt-20">{children}</div>
      <Footer />
    </div>
  );
}
