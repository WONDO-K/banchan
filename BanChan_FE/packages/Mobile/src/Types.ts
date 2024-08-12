import { ReactNode } from "react";
export interface SidebarItemProps {
  icon: string;
  text: string;
  to: string;
  children?: ReactNode;
}

export interface SwipeableContentProps {
  items: Array<{ question: string; options: string[] }>;
}

export interface DrawerProps {
  title: string;
  items: Array<{
    title: string;
    date: string;
    buttonText: string;
    statusText: string;
    onClick: () => void;
  }>;
}

export interface CalendarDrawerProps {
  title: string;
}

export interface HeaderProps {
  children: React.ReactNode;
}

export interface Items {
  title: string;
  date: string;
  buttonText: string;
  statusText: string;
}
