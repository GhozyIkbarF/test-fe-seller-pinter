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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export default function LayoutWrapper({
  isUserLayout = false,
  children,
}: {
  isUserLayout?: boolean;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: userProfile, isLoading } = useGetUserProfile();

  // const { isOnPreview } = useAppSelector((state) => state.state);

  const pathname = usePathname();
  const isAdminSide = pathname.startsWith("/admin");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userProfile) {
      dispatch(setUser(userProfile));
      if (isAdminSide && userProfile.role !== "Admin") {
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

  const previewPage = ["/admin/articles/pr"];

  const UserLayout = () => {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <TopNavbar />
        <div
          className={cn(pathname === "/" && !isMobile ? "mt-0" : "mt-[68px]")}
        >
          {children}
        </div>
        <Footer />
      </div>
    );
  };

  return isUserLayout ? (
    <UserLayout />
  ) : isAdminSide ? (
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
    <UserLayout />
  );
}
