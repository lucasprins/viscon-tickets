import React from "react";
import { NavigationSidebar } from "./NavigationSidebar";

export function NavigationSidebarDesktop() {
  return (
    <aside className="hidden md:flex flex-col w-[18rem] min-w-[18rem] justify-between h-screen border-r border-gray-300 py-8 dark:border-dark-500 dark:bg-dark-700">
      <NavigationSidebar />
    </aside>
  );
}
