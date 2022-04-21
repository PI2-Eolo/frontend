import "./App.css";
import Header from "./components/Header";
import PieChart from "./components/PieChart";
import Overview from "./components/Overview";
import { useEffect, useState } from "react";
import { getMetrics, Metrics } from "./services/metricService";
import MetricInfoModel from "./models/MetricInfoModel";
import mqttService from "./services/mqttService";

const emptyMetrics: Metrics = {
  realTime: new MetricInfoModel(),
  daily: new MetricInfoModel(),
  weekly: new MetricInfoModel(),
  monthly: new MetricInfoModel(),
};

function App() {
  const [consumption, setConsumption] = useState(0);
  const [energyProduction, setEnergyProduction] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);

  useEffect(() => {
    getMetrics().then(setMetrics);
  }, []);

  const onMessage = (topic: string, message: any) => {
    const value = +message.toString();
    switch (topic) {
      case "sensor/consumption":
        setConsumption(value);
        break;
      case "sensor/en_prod":
        setEnergyProduction(value);
        break;
      case "sensor/humidity":
        setHumidity(value);
        break;
      case "sensor/temperature":
        setTemperature(value);
        break;
    }
  };

  useEffect(() => {
    const client = mqttService.getClient(onMessage);
    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="App-upperContainer ">
        <div>
          <Overview
            realTimeData={{
              consumption,
              energyProduction,
              humidity,
              temperature,
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
  );
}

export default App;
