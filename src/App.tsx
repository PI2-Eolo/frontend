import "./App.css";
import Header from "./components/Header";
import PieChart from "./components/PieChart";
import Overview from "./components/Overview";
import { useEffect, useState } from "react";
import { getMetrics, Metrics } from "./services/metricService";
import MetricInfoModel from "./models/MetricInfoModel";
import mqttService from "./services/mqttService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlugCircleMinus,
  faPlugCircleBolt,
} from "@fortawesome/free-solid-svg-icons";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import axios from "axios";
import LineChart from "./components/LineChart";

const emptyMetrics: Metrics = {
  realTime: new MetricInfoModel(),
  daily: new MetricInfoModel(),
  weekly: new MetricInfoModel(),
  monthly: new MetricInfoModel(),
};

function App() {
  const [windSpeed, setWindSpeed] = useState(0);
  const [energyProduction, setEnergyProduction] = useState(0);
  const [rotorSpeed, setRotorSpeed] = useState(0);

  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const [colorWindSpeedIndicator, setColorWindSpeedIndicator] = useState("");
  const [rotorBlocked, setRotorBlocked] = useState(false);

  useEffect(() => {
    getMetrics().then(setMetrics);
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8000/wind/", {
        wind_speed: (windSpeed * 100).toFixed(0),
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [windSpeed]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/rotor/", {
        rotor_speed: (rotorSpeed * 100).toFixed(0),
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rotorSpeed]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/eletric-power/", {
        energy_production: (energyProduction * 100).toFixed(0),
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [energyProduction]);

  useEffect(() => {
    console.log(windSpeed);
    if (windSpeed) {
      if (windSpeed === 0) {
        setColorWindSpeedIndicator("#d6d6d6");
      } else if (windSpeed > 0 && windSpeed < 4) {
        setColorWindSpeedIndicator("#8c9eff");
      } else if (windSpeed > 4 && windSpeed < 10) {
        setColorWindSpeedIndicator("#64dd17");
      } else if (windSpeed > 10 && windSpeed < 20) {
        setColorWindSpeedIndicator("#ffff00");
      } else {
        setColorWindSpeedIndicator("#dd2c00");
      }
    }
  }, [windSpeed]);

  const onMessage = (topic: string, message: any) => {
    const value = +message.toString();
    switch (topic) {
      case "sensor/consumption":
        break;
      case "sensor/humidity":
        setRotorSpeed(value);
        setWindSpeed(value);
        break;
      case "sensor/en_prod":
        setEnergyProduction(value);
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
              windSpeed,
              rotorSpeed,
              energyProduction,
            }}
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
              <button
                className="button"
                onClick={() => window.open("http://localhost:8000/backup")}
              >
                <FontAwesomeIcon
                  icon={faBoxArchive}
                  style={{ width: 125, height: 125 }}
                />
                <div className="buttonLabel">Backup</div>
              </button>
              <div className="Overview-pad2" />
              <button
                className={rotorBlocked ? "buttonNoBrake" : "buttonBrake"}
                onClick={() => setRotorBlocked(!rotorBlocked)}
              >
                <FontAwesomeIcon
                  icon={faPlugCircleBolt}
                  style={{ width: 125, height: 125 }}
                />
                <div className="buttonLabel">
                  {rotorBlocked ? "Liberar Rotor" : "Travar Rotor"}
                </div>
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
          <div style={{ width: 500, height: 500 }}>
            <CircularProgressbar
              value={windSpeed}
              maxValue={30}
              text={`${windSpeed.toFixed(1)}m/s`}
              styles={buildStyles({
                pathTransitionDuration: 0.5,
                pathColor: colorWindSpeedIndicator,
                textColor: colorWindSpeedIndicator,
                trailColor: "#d6d6d6",
              })}
            />
          </div>
        </div>
      </div>
      <div className="main-charts-container">
        <LineChart
          label={"Velocidade do vento"}
          value={windSpeed}
          unit={"m/s"}
          lineColor="#8c9eff"
        />

        <LineChart
          label={"Velocidade do rotor"}
          value={rotorSpeed}
          unit={"m/s"}
          lineColor="#64dd17"
        />

        <LineChart
          label={"Energia produzida"}
          value={energyProduction}
          unit={"kW/h"}
          lineColor="#D1D100"
        />
      </div>
    </div>
  );
}

export default App;

// <a href="https://www.flaticon.com/br/icones-gratis/gerador" title="gerador ícones">Gerador ícones criados por surang - Flaticon</a>
