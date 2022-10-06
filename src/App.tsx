import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <>
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
