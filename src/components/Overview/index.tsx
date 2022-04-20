import { useEffect, useState } from "react";
import MetricInfo from "../MetricInfo";
import Selector from "../Selector";
import MetricInfoModel from "../../models/MetricInfoModel";
import mqttService from "../../services/mqttService";
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
  const [client, setClient] = useState(null);

  useEffect(() => {
    onChangeSelector(period);
    // if (period !== 'realtime') {
    //   mqttService.unsubscribe(client);
    // }
    // else {
    const a = mqttService.getClient();
    storeMqttClient(a);
    mqttService.subscribe(client)
    // }
  }, [realTimeData, dailyData, weeklyData, monthlyData]);

  useEffect(() => {
    const client = mqttService.getClient();
    storeMqttClient(client);
    const callBack = (mqttMessage: string) => handleMessage(mqttMessage);
    mqttService.onMessage(client, callBack);
    return () => mqttService.closeConnection(client);
  })

  const handleMessage = (msg: string) => {
    console.log(msg)
  }

  const storeMqttClient = (client: any) => {
    setClient(client);
  }

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
        <div className="Overview-pad2" />
        <MetricInfo
          label="Energy production"
          value={metricInfo.energyProduction}
          unit="kw/h"
        />
        <div className="Overview-pad2" />
        <MetricInfo label="Humidity" value={metricInfo.humidity} unit="kw/h" />
        <div className="Overview-pad2" />
        <MetricInfo
          label="Temperature"
          value={metricInfo.temperature}
          unit="kw/h"
        />
        <div className="Overview-pad12" />
      </div>
    </div>
  );
};

export default Overview;
