import mqttService from "../../src/services/mqttService";
describe("mqqt server tests", () => {
  it("can connect to mqtt server", () => {
    const client = mqttService.getClient();
  });
});
