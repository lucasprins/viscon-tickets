import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Backdrop from "./components/atoms/Backdrop/Backdrop";
import { ModalChangeLanguage } from "./components/organisms/Modal/ModalChangeLanguage";
import { getBackdropState } from "./features/modal/modalSlice";
import { useAppSelector } from "./utils/hooks";
import { routes } from "./routes";

function App() {
	const backdropState = useAppSelector(getBackdropState);
	
	return (
		<>
			<ModalChangeLanguage />
			<Backdrop state={backdropState} z_index='z-40' />
			<Router>
				<Routes>
					{routes.map(({ path, component }, key) => (
						<Route path={path} key={key} element={component} />
					))}
				</Routes>
			</Router>
		</>
	);
}

export default App;
