import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { getLocalItem, setLocalItem } from "../local-storage";

export function AcceptToken() {
  const { push } = useHistory();
  const [pat, setPat] = useState(null);
  return (
    <div className="token-capture">
      <label htmlFor="pat">Please enter your personal access token: </label>
      <input
        type="password"
        name="pat"
        id="pat"
        onChange={(e) => setPat(e.target.value)}
      />
      <button
        onClick={() => {
          setLocalItem("pat", pat);
          push("/commits");
        }}
      >
        Accept
      </button>
    </div>
  );
}

export function getPat() {
  return getLocalItem("pat");
}

export function patEmpty() {
  return getPat() === "" || getPat() === "null";
}

export function ClearPatButton() {
  const { push } = useHistory();
  return (
    <button
      className="top-left"
      onClick={() => {
        setLocalItem("pat", "");
        push("/");
      }}
    >
      Clear Token
    </button>
  );
}
