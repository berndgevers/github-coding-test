import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../logo.svg";

export function PageNotFound() {
  const { push } = useHistory();
  return (
    <div>
      <h1>Page not Found!</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <br />
      <button onClick={() => push("/")}>Return to homepage</button>
    </div>
  );
}
