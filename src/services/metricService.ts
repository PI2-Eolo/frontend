import MetricInfoModel from "../models/MetricInfoModel";

const getRealTimeMetrics = async () => {
  return {
    consumption: 12,
    energyProduction: 9.2,
    humidity: 12.3,
    temperature: 42.4,
  };
};

const getDailyMetrics = async () => {
  return {
    consumption: 13.2,
    energyProduction: 11.2,
    humidity: 11.3,
    temperature: 39.4,
  };
};

const getWeeklyMetrics = async () => {
  return {
    consumption: 43.2,
    energyProduction: 31.2,
    humidity: 21.3,
    temperature: 231.4,
  };
};

const getMonthlyMetrics = async () => {
  return {
    consumption: 143.2,
    energyProduction: 131.2,
    humidity: 121.3,
    temperature: 321.4,
  };
};

export interface Metrics {
  realTime: MetricInfoModel;
  daily: MetricInfoModel;
  weekly: MetricInfoModel;
  monthly: MetricInfoModel;
}

export const getMetrics = async () => {
  return {
    realTime: await getRealTimeMetrics(),
    daily: await getDailyMetrics(),
    weekly: await getWeeklyMetrics(),
    monthly: await getMonthlyMetrics(),
  };
};
