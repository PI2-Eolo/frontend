export default class MetricInfoModel {
  constructor(
    public consumption: number = 0,
    public energyProduction: number = 0,
    public humidity: number = 0,
    public temperature: number = 0
  ) {}
}
