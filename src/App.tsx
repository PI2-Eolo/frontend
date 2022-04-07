import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Selector from "./components/Selector";
import MetricInfo from "./components/MetricInfo";

function App() {
  return (
    <div className="App">
      <Header />
      <Selector
        options={[
          {
            label: "Realtime",
            value: "realtime",
          },
          {
            label: "Daily",
            value: "daily",
          },
          {
            label: "Weekly",
            value: "weekly",
          },
          {
            label: "Monthly",
            value: "monthly",
          },
        ]}
      />
      <MetricInfo 
        label="Consumption"
        value="13.3"
        unit="kWh"
      />
    </div>
  );
}

export default App;
