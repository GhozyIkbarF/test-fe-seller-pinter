import { Route } from "@/types";
import {
  FileText,
  Tag,
  LogOut,
} from "lucide-react";

export const RouteList: Route[] = [
  { routeType: 'page', href: "/admin/articles", icon: FileText, label: "Articles" },
  { routeType: 'page', href: "/admin/categories", icon: Tag, label: "Categories" },
  { routeType: 'page', href: "/auth/login", icon: LogOut, label: "Logout", actions: () => {}},
];

