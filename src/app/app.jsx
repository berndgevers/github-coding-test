import "./app.css";
import React from "react";
import { ThemeProvider } from "@zendeskgarden/react-theming";
import { BrowserRouter } from "react-router-dom";
import { StaticRoutes } from "../routing/routes";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="App">
          <div className="App-body">
            <StaticRoutes />
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
