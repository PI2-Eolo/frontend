import mqtt from "mqtt";

const topics = [
  "sensor/consumption",
  "sensor/en_prod",
  "sensor/humidity",
  "sensor/temperature",
];
const websocketUrl = "ws://localhost:9001";

const getClient = (onMessage: (topic: string, message: any) => void) => {
  const client = mqtt.connect(websocketUrl);
  client.on("connect", function () {
    const callBack = (err: any) => {
      if (err) {
        console.log("Subscription request failed");
      } else {
        console.log("Subscription request successful");
      }
    };
    topics.forEach((topic) => {
      client.subscribe(topic, callBack);
    });
  });
  client.on("message", onMessage);
  return client;
};

const mqttService = {
  getClient,
};

export default mqttService;
