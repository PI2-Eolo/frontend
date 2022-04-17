import React from "react";
import "./index.css";

interface MetricInforProps {
  label: string;
  value: number;
  unit: string;
  decimalPlaces?: number;
}

const MetricInfo = ({
  label,
  value,
  unit,
  decimalPlaces = 2,
}: MetricInforProps) => {
  const stringValue = value.toFixed(decimalPlaces);

  return (
    <div className="metric-info-container">
      <span className="label">{label}</span>
      <div className="value-container">
        <span className="value">{stringValue}</span>
        <span className="unit">{unit}</span>
      </div>
    </div>
  );
};

export default MetricInfo;
