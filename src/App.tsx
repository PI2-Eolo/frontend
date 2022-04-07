import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Selector from "./components/Selector";
import MetricInfo from "./components/MetricInfo";
import PieChart from "./components/PieChart";

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
      <MetricInfo label="Consumption" value={13.3} unit="kW/h" />

      <MetricInfo label="Energy production" value={25.1} unit="kw/h" />

      <PieChart
        label="Consumption details"
        data={[
          { label: "Kitchen", value: 241, color: "#7459D9" },
          { label: "Living room", value: 132, color: "#B9ABEB" },
          { label: "Other", value: 32, color: "#E3DEF7" },
        ]}
        unit="kW/h"
      />
    </div>
  );
}

export default App;
