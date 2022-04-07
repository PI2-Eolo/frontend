import "./index.css";
import { PieChart as GraphPieChart } from "react-minimal-pie-chart";

interface DataDetails {
  label: string;
  value: number;
  color: string;
}
interface PieChartProps {
  unit: string;
  data: DataDetails[];
}

const PieChart = ({ data, unit }: PieChartProps) => {
  return (
    <div className="pie-chart-container">
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
      />
    </div>
  );
};

export default PieChart;
