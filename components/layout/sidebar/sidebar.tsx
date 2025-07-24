import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GenerateRoutes } from "./sidebarMenu";
import { RouteList } from "@/constants/route";
import { useRoute } from "./hook";
import { cn } from "@/lib/utils";
import Logo from "@/public/Logo.svg";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setDialogLogout } from "@/store/slices/counterSlice";
import { logout } from "@/store/slices/authSlice";
import { AlertLogout } from "@/components/common";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const {
    openHeader,
    setOpenHeader,
    isActive,
    handleHeaderClick,
    handleSetHeader,
  } = useRoute();
  
  const { dialogLogout } = useAppSelector((state) => state.state);
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      {/* lg:static */}
      <div
        className={cn(`
        fixed text-grey lg:h-full inset-y-0 left-0 z-50 pt-4 pb-2 lg:pt-6 lg:pb-4 gap-y-6
        w-[267px] bg-blue-600 text-white
        flex flex-col transform transition-transform  duration-700 ease-in-out`,
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
    )}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <Button size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Logo */}
        <div className="px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Image src={Logo} alt="Logo" width={100} height={100} />
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-4 overflow-x-hidden">
          <nav>
            <GenerateRoutes
              items={RouteList}
              parentRoute=""
              openHeader={openHeader}
              setOpenHeader={setOpenHeader}
              handleHeaderClick={handleHeaderClick}
              handleSetHeader={handleSetHeader}
              isActive={isActive}
            />
          </nav>
        </div>

        {/* Logout Button */}
        {dialogLogout &&
          <AlertLogout
            isDialogOpen={dialogLogout}
            setIsDialogOpen={(open: boolean) => dispatch(setDialogLogout(open))}
            mutate={() => {
              dispatch(logout());
              }}
          />
        }
      </div>
    </>
  );
}
