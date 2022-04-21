import "./App.css";
import Header from "./components/Header";
import PieChart from "./components/PieChart";
import Overview from "./components/Overview";
import { useEffect, useState } from "react";
import { getMetrics, Metrics } from "./services/metricService";
import MetricInfoModel from "./models/MetricInfoModel";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const emptyMetrics: Metrics = {
  realTime: new MetricInfoModel(),
  daily: new MetricInfoModel(),
  weekly: new MetricInfoModel(),
  monthly: new MetricInfoModel(),
};

function App() {
  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const [colorWindSpeedIndicator, setColorWindSpeedIndicator] = useState("");

  useEffect(() => {
    getMetrics().then(setMetrics);
  }, []);

  useEffect(() => {
    console.log(metrics)
    if (metrics) {
      if (metrics.realTime.windSpeed === 0){
        setColorWindSpeedIndicator("#d6d6d6");
      } else if (metrics.realTime.windSpeed > 0  && metrics.realTime.windSpeed < 4){
        setColorWindSpeedIndicator("#8c9eff");
      } else if (metrics.realTime.windSpeed > 4  && metrics.realTime.windSpeed < 10){
        setColorWindSpeedIndicator("#64dd17");
      } else if (metrics.realTime.windSpeed > 10  && metrics.realTime.windSpeed < 20){
        setColorWindSpeedIndicator("#ffff00");
      } else {
        setColorWindSpeedIndicator("#dd2c00");
      }
    }
  }, [metrics.realTime.windSpeed]);

  return (
    <div className="App">
      <Header />
      <div className="App-upperContainer ">
        <div>
          <Overview
            realTimeData={metrics.realTime}
            dailyData={metrics.daily}
            weeklyData={metrics.weekly}
            monthlyData={metrics.monthly}
          />
          
          <h1>Outras Opções</h1>
          
        </div>

        <div className="wind-speed">
          {/* <PieChart
            label="Velocidade do Vento"
            data={[
              { label: "Kitchen", value: 241, color: "#7459D9" },
              { label: "Living room", value: 132, color: "#B9ABEB" },
              { label: "Other", value: 32, color: "#E3DEF7" },
            ]}
            unit="kW/h"
          /> */}
          <h1>Velocidade do Vento</h1>
          <div style={{width: 500, height: 500}}>
          <CircularProgressbar
            value={metrics.realTime.windSpeed} maxValue={30} text={`${metrics.realTime.windSpeed}m/s`}
            styles={buildStyles({
              pathTransitionDuration: 0.5,
              pathColor: colorWindSpeedIndicator,
              textColor: colorWindSpeedIndicator,
              trailColor: '#d6d6d6'
            })}
          />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
