import React from "react";
import "./index.css";

interface MetricInforProps {
  label: string;
  value: string;
  unit: string;
}

const MetricInfo = ({ label, value, unit }: MetricInforProps) => {
  return (
    <div className="metric-info-container">
      <span className="label">{label}</span>
      <div className="value-container">
        <span className="value">{value}</span>
        <span className="unit">{unit}</span>
      </div>
    </div>
  );
};

export default MetricInfo;
