import { ElementType } from "react";

type RouteType = "section" | "header" | "page" | "action";
interface Route {
  routeType?: RouteType;
  href: string;
  label: string;
  icon?: ElementType;
  children?: Route[];
  actions?: () => void;
}

export type { Route };
