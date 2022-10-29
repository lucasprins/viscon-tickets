import React from "react";
import { NavigationSidebar } from "./NavigationSidebar";

export function NavigationSidebarDesktop() {
  return (
    // <aside className="hidden md:flex flex-col w-[18rem] min-w-[18rem] justify-between h-screen border-r border-gray-200 py-8 dark:border-dark-600 dark:bg-dark-800">
    //   <NavigationSidebar />
    // </aside>
    <aside className="dark hidden md:flex flex-col w-[18rem] min-w-[18rem] justify-between h-screen border-r border-gray-200 py-8 dark:border-dark-600 bg-dark-800">
      <NavigationSidebar />
    </aside>
  );
}
