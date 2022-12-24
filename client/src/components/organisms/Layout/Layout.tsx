import React, { useState } from "react";
import { useModalContext } from "../../../utils/hooks";
import Backdrop from "../../atoms/Backdrop/Backdrop";
import { NavigationMobile } from "../Navigation/NavigationMobile";
import { NavigationSidebarDesktop } from "../Navigation/NavigationSidebarDesktop";
import { NavigationSidebarMobile } from "../Navigation/NavigationSidebarMobile";

export default function Layout() {
	const { modalDispatch } = useModalContext();
	const [sidebar, setSidebar] = useState(false);

	const toggleSidebar = () => {
		setSidebar((prevState) => !prevState);
		modalDispatch({ type: "TOGGLE_BACKDROP", payload: "z-20" });
	};

	return (
		<>
			<NavigationMobile openSidebar={toggleSidebar} />
			<Backdrop close={toggleSidebar} />
			<NavigationSidebarMobile state={sidebar} />
			<NavigationSidebarDesktop />
		</>
	);
}
