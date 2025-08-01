"use client";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logout } from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Logo from "@/public/Logo.svg";
import Logo2 from "@/public/Logo2.svg";
import Image from "next/image";
import { cn, pathToRegex } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type NavHeaderProps = {
  title?: string;
  setSidebarOpen?: (open: boolean) => void;
};

const TopNavbar = (props: NavHeaderProps) => {
  const { username, role } = useAppSelector((state) => state.auth.data);
  const { titlePage, isOnPreview } = useAppSelector((state) => state.state);

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isAdminSide = pathname.startsWith("/admin");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isHomePageAndNotMobile = pathname === "/" && !isMobile;
  const router = useRouter();

  const previewPaths = [
    "/admin/articles/:id",
  ];

  const isOnPreviewPage = previewPaths.some((pattern) =>
    pathToRegex(pattern).test(pathname)
  );

  const { setSidebarOpen } = props;
  return (
    <div
      className={cn(
        "fixed z-40 right-0 left-0 flex justify-between items-center h-[68px] bg-gray-50 px-6 pt-5 pb-4 border-b border-slate-200 text-slate-900 border",
        !isAdminSide && "px-5 lg:px-[60px] py-4 lg:py-8",
        isAdminSide && !isOnPreviewPage && "lg:ml-[267px]",
        isHomePageAndNotMobile
          ? "bg-transparent relative border-none"
          : "bg-gray-50"
      )}
    >
      {isAdminSide && !isOnPreviewPage ? (
        <div className="flex items-center space-x-4">
          <Button
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen && setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">{titlePage}</h1>
        </div>
      ) : (
        <button
          className="bg-transparent cursor-pointer"
          onClick={() => {
            if (isOnPreviewPage ) {
              router.back();
            }
            if (isAdminSide) {
              router.push("/admin");
            }
            router.push("/");
          }}
        >
          <Image
            src={isHomePageAndNotMobile ? Logo : Logo2}
            alt="Logo"
            width={100}
            height={100}
          />
        </button>
      )}

      <div className="flex items-center space-x-1.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <button className="flex items-center gap-2 bg-transparent outline-none focus:outline-none">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-sm font-medium text-blue-900 bg-blue-200">
                  {username ? username.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <span
                className={cn(
                  "hidden lg:block text-sm font-medium hover:underline underline-offset-4",
                  isHomePageAndNotMobile && "text-white"
                )}
              >
                {username}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                router.push(isAdminSide ? "/admin/profile" : "/profile")
              }
            >
              My Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {role === "Admin" && !isAdminSide && (
              <>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => router.push("/admin")}
                >
                  Dashboard admin
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <LogOut className="text-red-500" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavbar;
