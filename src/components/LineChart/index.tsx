import React, { useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReactLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./index.css";

interface LineChartProps {
  label: string;
  value: number;
  unit: string;
  lineColor?: string;
  decimalPlaces?: number;
}

const getTimeNow = () =>
  new Date().toISOString().replace(/T/, " ").replace(/\..+/, "").split(" ")[1];

const LineChart = ({
  label: originalLabel,
  value,
  unit,
  decimalPlaces = 2,
  lineColor = "#8884d8",
}: LineChartProps) => {
  const label = `${originalLabel} (${unit})`;
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    const time = getTimeNow();
    const stringValue = value.toFixed(decimalPlaces) + unit;
    let newMetric: any = {
      name: time,
      amt: stringValue,
    };
    newMetric[label] = value.toFixed(decimalPlaces);

    setData([...data, newMetric].slice(-10));
  }, [value]);

  return (
    <div className="line-chart-container">
      <ReactLineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={label}
          stroke={lineColor}
          activeDot={{ r: 8 }}
        />
      </ReactLineChart>
    </div>
  );
};

export default LineChart;
