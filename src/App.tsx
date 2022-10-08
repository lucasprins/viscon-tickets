import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Backdrop from "./components/Backdrop/Backdrop";
import { ModalChangeLanguage } from "./components/Modal/ModalChangeLanguage";
import { getBackdropState } from "./features/modal/modalSlice";
import { useAppSelector } from "./hooks/reduxHooks";
import { routes } from "./routes";

function App() {
	const backdropState = useAppSelector(getBackdropState);
	
	return (
		<>
			<ModalChangeLanguage />
			<Backdrop state={backdropState} />
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
