import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Route } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { setTitle, setDialogLogout } from "@/store/slices/counterSlice";

type RenderMenuProps = {
  items: Route[];
  parentRoute: string;
  openHeader: string | null;
  setOpenHeader: (header: string | null) => void;
  handleHeaderClick: (href: string) => void;
  handleSetHeader: (title: string) => void;
  isActive: (href: string) => boolean;
};

export const GenerateRoutes = (props: RenderMenuProps) => {
  const {
    items,
    parentRoute = "",
    openHeader,
    setOpenHeader,
    handleHeaderClick,
    handleSetHeader,
    isActive,
  } = props;

  const dispatch = useAppDispatch();

  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;
        const fullPath = parentRoute === "" ? item.href : `${parentRoute}${item.href}`;
        const pathDepth = fullPath.split("/").length;
        const normalizedOpenPath = openHeader
          ? openHeader.split("/").slice(0, pathDepth).join("/")
          : null;
        const isOpen = normalizedOpenPath === fullPath;

        if (item.routeType === 'page') {
          return (
            <li key={item.href} className="group">
              <Link
                href={fullPath}
                className={cn(
                  "flex items-center justify-between py-2 px-4 rounded-[6px] text-[16px] font-medium cursor-pointer transition-colors",
                  isActive(fullPath) && "bg-[rgba(255,255,255,0.2)]"
                )}
                onClick={() => {
                  handleHeaderClick(fullPath);
                  handleSetHeader(item.label);
                }}
              >
                <div className="flex items-center space-x-2 lg:space-x-3">
                  {item.icon &&
                    React.createElement(item.icon, {
                      className: "w-4 h-4 lg:w-5 lg:h-5",
                    })}
                  <span className="text-xs lg:text-sm">{item.label}</span>
                </div>
              </Link>
            </li>
          );
        }

        if (item.routeType === 'action') {
          return (
            <li key={item.label}>
              <button
                className={cn(
                  "w-full flex items-center justify-between py-2 px-4 rounded-[6px] text-[16px] font-medium cursor-pointer transition-colors",
                )}
                onClick={() => {
                  dispatch(setDialogLogout(true));
                }}
              >
                <div className="flex items-center space-x-2 lg:space-x-3">
                  {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" />}
                  <span className="text-xs lg:text-sm">{item.label}</span>
                </div>
              </button>
            </li>
          );
        }

        if (item.routeType === 'header') {
          return (
            <li key={item.label}>
              <button
                className={cn(
                  "w-full flex items-center justify-between p-2 cursor-pointer",
                  isActive(fullPath) && "text-iris font-bold"
                )}
                onClick={() => handleHeaderClick(fullPath)}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  isOpen ? "max-h-[500px] mt-1" : "max-h-0"
                )}
              >
                {isOpen && item.children && (
                  <div className="ml-1.5 mt-1 space-y-1">
                    <GenerateRoutes
                      items={item.children}
                      parentRoute={fullPath}
                      openHeader={openHeader}
                      setOpenHeader={setOpenHeader}
                      handleHeaderClick={handleHeaderClick}
                      handleSetHeader={handleSetHeader}
                      isActive={isActive}
                    />
                  </div>
                )}
              </div>
            </li>
          );
        }

        if (item.routeType === 'section') {
          return (
            <div key={item.label}>
              <div>
                <h4 className="text-xs font-semibold uppercase mb-1">
                  {item.label}
                </h4>
                {item.children && (
                  <GenerateRoutes
                    items={item.children}
                    parentRoute={fullPath}
                    openHeader={openHeader}
                    setOpenHeader={setOpenHeader}
                    handleHeaderClick={handleHeaderClick}
                    handleSetHeader={handleSetHeader}
                    isActive={isActive}
                  />
                )}
              </div>
            </div>
          );
        }

        return null;
      })}
    </ul>
  );
};
