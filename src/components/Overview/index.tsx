import MetricInfo from "../MetricInfo";
import Selector from "../Selector";
import "./index.css";

const Overview = () => {
  return (
    <div className="Overview">
      <div className="Overview-header">
        <h1>Overview</h1>
        <div>
          <Selector
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
          />
        </div>
      </div>

      <div className="Overview-infos">
        <MetricInfo label="Consumption" value={13.3} unit="kW/h" />
        <MetricInfo label="Energy production" value={25.1} unit="kw/h" />
        <MetricInfo label="Humidity" value={25.1} unit="kw/h" />
        <MetricInfo label="Temperature" value={25.1} unit="kw/h" />
      </div>
    </div>
  );
};

export default Overview;
