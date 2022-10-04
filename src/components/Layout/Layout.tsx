import React, { useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { NavigationMobile } from "../Navigation/NavigationMobile";
import { NavigationSidebarDesktop } from "../Navigation/NavigationSidebarDesktop";
import { NavigationSidebarMobile } from "../Navigation/NavigationSidebarMobile";

export default function Layout() {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  return (
    <>
      <NavigationMobile openSidebar={toggleSidebar} />
      <Backdrop state={sidebar} close={toggleSidebar} />
      <NavigationSidebarMobile state={sidebar} />
      <NavigationSidebarDesktop />
    </>
  );
}
