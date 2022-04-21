import { useEffect, useState } from "react";

import MetricInfo from "../MetricInfo";
import Selector from "../Selector";
import MetricInfoModel from "../../models/MetricInfoModel";

import "./index.css";

interface OverviewProps {
  realTimeData: MetricInfoModel;
  dailyData: MetricInfoModel;
  weeklyData: MetricInfoModel;
  monthlyData: MetricInfoModel;
}

const Overview = ({
  realTimeData,
  dailyData,
  weeklyData,
  monthlyData,
}: OverviewProps) => {
  const [metricInfo, setMetricInfo] = useState(new MetricInfoModel());
  const [period, setPeriod] = useState("realtime");

  useEffect(() => {
    onChangeSelector(period);
  }, [realTimeData, dailyData, weeklyData, monthlyData]);

  const onChangeSelector = (period: string) => {
    switch (period) {
      case "realtime":
        setMetricInfo(realTimeData);
        setPeriod("realtime");
        break;
      case "daily":
        setMetricInfo(dailyData);
        setPeriod("daily");
        break;
      case "weekly":
        setMetricInfo(weeklyData);
        setPeriod("weekly");
        break;
      case "monthly":
        setMetricInfo(monthlyData);
        setPeriod("monthly");
        break;
    }
  };

  return (
    <div className="Overview">
      <div className="Overview-header">
        <h1>Dados Coletados</h1>
        <div>
          <Selector
            defaultValue="realtime"
            options={[
              {
                label: "Agora",
                value: "realtime",
              },
              {
                label: "Dia",
                value: "daily",
              },
              {
                label: "Semana",
                value: "weekly",
              },
              {
                label: "Mês",
                value: "monthly",
              },
            ]}
            onChange={onChangeSelector}
          />
        </div>
      </div>

      <div className="Overview-infos">
        <div className="Overview-pad12" />
        <MetricInfo
          label="Velocidade do Vento"
          value={metricInfo.windSpeed}
          unit="m/s"
        />
        <div className="Overview-pad2" />
        <MetricInfo
          label="Velocidade do Rotor"
          value={metricInfo.rotorSpeed}
          unit="m/s"
        />
        <div className="Overview-pad2" />
        <MetricInfo
          label="Potência Elétrica"
          value={metricInfo.energyProduction}
          unit="kw/h"
        />
        <div className="Overview-pad12" />
      </div>
    </div>
  );
};

export default Overview;
