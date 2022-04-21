import "./App.css";
import Header from "./components/Header";
import PieChart from "./components/PieChart";
import Overview from "./components/Overview";
import { useEffect, useState } from "react";
import { getMetrics, Metrics } from "./services/metricService";
import MetricInfoModel from "./models/MetricInfoModel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlugCircleMinus, faPlugCircleBolt } from "@fortawesome/free-solid-svg-icons";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import axios from 'axios';

const emptyMetrics: Metrics = {
  realTime: new MetricInfoModel(),
  daily: new MetricInfoModel(),
  weekly: new MetricInfoModel(),
  monthly: new MetricInfoModel(),
};

function App() {
  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const [colorWindSpeedIndicator, setColorWindSpeedIndicator] = useState("");
  const [rotorBlocked, setRotorBlocked] = useState(false); 

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
          <div className="Other-Options">
            <div className="Other-Options-Header">
              <h1>Outras Opções</h1>
            </div>

            <div className="Overview-infos">
              <div className="Overview-pad12" />
              <button className="button" onClick={() => window.open("http://localhost:8000/backup")}>
                <FontAwesomeIcon icon={faBoxArchive} style={{width: 125, height: 125}}/>
                <div className="buttonLabel">Backup</div>
              </button>
              <div className="Overview-pad2" />
              <button className={rotorBlocked ? "buttonNoBrake" : "buttonBrake"} onClick={() => setRotorBlocked(!rotorBlocked)}>
                <FontAwesomeIcon icon={faPlugCircleBolt} style={{width: 125, height: 125}}/>
                <div className="buttonLabel">{rotorBlocked ? "Liberar Rotor" : "Travar Rotor"}</div>
              </button>
              <div className="Overview-pad12" />
            </div>
          </div>
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

// <a href="https://www.flaticon.com/br/icones-gratis/gerador" title="gerador ícones">Gerador ícones criados por surang - Flaticon</a>
