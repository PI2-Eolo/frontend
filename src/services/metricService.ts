import MetricInfoModel from "../models/MetricInfoModel";

const getRealTimeMetrics = async () => {
  return {
    windSpeed: 17,
    rotorSpeed: 1,
    energyProduction: 9.2,
  };
};

const getDailyMetrics = async () => {
  return {
    windSpeed: 15,
    rotorSpeed: 17,
    energyProduction: 1.42,
  };
};

const getWeeklyMetrics = async () => {
  return {
    windSpeed: 7,
    rotorSpeed: 7,
    energyProduction: 1.05,
  };
};

const getMonthlyMetrics = async () => {
  return {
    windSpeed: 3,
    rotorSpeed: 4,
    energyProduction: 0.45,
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
