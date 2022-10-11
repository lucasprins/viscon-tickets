import React from "react";
import { NavigationSidebar } from "./NavigationSidebar";

export function NavigationSidebarDesktop() {
  return (
    <aside className="hidden md:flex flex-col justify-between h-screen w-72 border-r border-gray-300 py-8 dark:border-dark-500 dark:bg-dark-700">
      <NavigationSidebar />
    </aside>
  );
}
