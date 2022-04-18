import { useEffect, useState } from "react";
import MetricInfo from "../MetricInfo";
import Selector from "../Selector";
import "./index.css";

interface MetricInfo {
  consumption: number;
  energyProduction: number;
  humidity: number;
  temperature: number;
}

interface OverviewProps {
  realTimeData: MetricInfo;
  dailyData: MetricInfo;
  weeklyData: MetricInfo;
  monthlyData: MetricInfo;
}

const emptyMetriInfo = {
  consumption: 0,
  energyProduction: 0,
  humidity: 0,
  temperature: 0,
};

const Overview = ({
  realTimeData,
  dailyData,
  weeklyData,
  monthlyData,
}: OverviewProps) => {
  const [metricInfo, setMetricInfo] = useState(emptyMetriInfo);
  const [period, setPeriod] = useState("realTime");

  useEffect(() => {
    onChangeSelector(period);
  }, [realTimeData, dailyData, weeklyData, monthlyData]);

  const onChangeSelector = (period: string) => {
    switch (period) {
      case "realtime":
        setMetricInfo(realTimeData);
        setPeriod("realTime");
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
        <h1>Overview</h1>
        <div>
          <Selector
            defaultValue="realtime"
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
            onChange={onChangeSelector}
          />
        </div>
      </div>

      <div className="Overview-infos">
        <MetricInfo
          label="Consumption"
          value={metricInfo.consumption}
          unit="kW/h"
        />
        <MetricInfo
          label="Energy production"
          value={metricInfo.energyProduction}
          unit="kw/h"
        />
        <MetricInfo label="Humidity" value={metricInfo.humidity} unit="kw/h" />
        <MetricInfo
          label="Temperature"
          value={metricInfo.temperature}
          unit="kw/h"
        />
      </div>
    </div>
  );
};

export default Overview;
