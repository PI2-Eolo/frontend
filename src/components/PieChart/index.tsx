import "./index.css";
import { PieChart as GraphPieChart } from "react-minimal-pie-chart";

interface DataDetails {
  label: string;
  value: number;
  color: string;
}
interface PieChartProps {
  label?: string;
  unit?: string;
  data?: DataDetails[];
}

const PieChart = ({ label = "", data = [], unit = "" }: PieChartProps) => {
  return (
    <div className="pie-chart-container">
      <h2 className="pie-chart-label">{label}</h2>
      <div className="pie-chart-content">
        <GraphPieChart
          data={data.map((item) => ({
            title: item.label,
            value: item.value,
            color: item.color,
          }))}
          lineWidth={20}
          radius={30}
          rounded={true}
          paddingAngle={15}
          viewBoxSize={[80, 80]}
          center={[35, 30]}
        />
        <div className="pie-chart-label-list">
          {data.map((item) => (
            <div className="pie-chart-item-label-container">
              <span
                className="pie-char-label-color-bar"
                style={{ backgroundColor: item.color }}
              />
              <div className="pie-chart-value-container">
                <span className="pie-chart-item-label">{item.label}</span>
                <span className="pie-chart-item-value">
                  {item.value} {unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
