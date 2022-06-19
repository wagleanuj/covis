import React from "react";
import "./App.css";
import { Explorer } from "./components/Explorer";
import { AppProvider } from "./AppProvider";

export function App() {
  return (
    <AppProvider>
      <div className="App" style={{ height: "100vh" }}>
      <Explorer />
      </div>
    </AppProvider>
  );
}
