import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Selector from "./components/Selector";
import MetricInfo from "./components/MetricInfo";
import PieChart from "./components/PieChart";
import Overview from "./components/Overview";

function App() {
  return (
    <div className="App">
      <Header />
      <Overview />

      <div style={{ marginRight: "10%" }}>
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
    </div>
  );
}

export default App;
