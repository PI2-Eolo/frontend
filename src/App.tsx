import "./App.css";
import Header from "./components/Header";
import PieChart from "./components/PieChart";
import Overview from "./components/Overview";
import { useEffect, useState } from "react";
import { getMetrics, Metrics } from "./services/metricService";
import MetricInfoModel from "./models/MetricInfoModel";
import { Connector } from "mqtt-react-hooks";
import { useMqttState } from "mqtt-react-hooks";

const emptyMetrics: Metrics = {
  realTime: new MetricInfoModel(),
  daily: new MetricInfoModel(),
  weekly: new MetricInfoModel(),
  monthly: new MetricInfoModel(),
};

function App() {
  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const { connectionStatus } = useMqttState();

  useEffect(() => {
    getMetrics().then(setMetrics);
  }, []);

  return (
    <Connector brokerUrl="mqtt">
      <div className="App">
        <Header />
        <div className="App-upperContainer ">
          <h1>{`Status: ${connectionStatus}`}</h1>
          <div>
            <Overview
              realTimeData={metrics.realTime}
              dailyData={metrics.daily}
              weeklyData={metrics.weekly}
              monthlyData={metrics.monthly}
            />
            {
              // Earnings goes here
            }
          </div>

          <div>
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
      </div>
    </Connector>
  );
}

export default App;
