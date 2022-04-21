import "./App.css";
import Header from "./components/Header";
import PieChart from "./components/PieChart";
import Overview from "./components/Overview";
import { useEffect, useState } from "react";
import { getMetrics, Metrics } from "./services/metricService";
import MetricInfoModel from "./models/MetricInfoModel";
import { Connector } from "mqtt-react-hooks";
import { useMqttState } from "mqtt-react-hooks";
import { useSubscription } from "mqtt-react-hooks";

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

  const { message: consumption } = useSubscription(["sensor/consumption"]);
  const { message: en_prod } = useSubscription(["sensor/en_prod"]);
  const { message: humidity } = useSubscription(["sensor/humidity"]);
  const { message: temperature } = useSubscription(["sensor/temperature"]);

  return (
    <Connector brokerUrl="ws://mqtt:9001">
      <div className="App">
        <Header />
        <div className="App-upperContainer ">
          <h1>{`Status: ${connectionStatus}`}</h1>
          <p>{` consumption: ${consumption}`}</p>
          <p>{` en_prod: ${en_prod}`}</p>
          <p>{` humidity: ${humidity}`}</p>
          <p>{` temperature: ${temperature}`}</p>
          <div>
            <Overview
              realTimeData={{
                consumption: +(consumption?.message || "0"),
                energyProduction: +(en_prod?.message?.toString() || "0"),
                humidity: +(humidity?.message || "0"),
                temperature: +(temperature?.message || "0"),
              }}
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
