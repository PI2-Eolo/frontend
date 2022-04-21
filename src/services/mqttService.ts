import * as mqtt from "mqtt";

const topics = ['sensor/consumption',
                'sensor/en_prod',
                'sensor/humidity',
                'sensor/temperature'];
const websocketUrl = 'mqtt://localhost:1883';
const apiEndpoint = ''

const getClient = () => {
  const client = mqtt.connect(websocketUrl);
  client.on("error", (err) => {
    console.log(`Connection to ${websocketUrl} failed`);
    client.end();
  });
  return client;
}

const subscribe = (client: any) => {
  const callBack = (err: any, granted: any) => {
    if (err) {
      console.log("Subscription request failed");
    }
  };
  topics.forEach(topic => {
    client.subscribe(topic, callBack);
  });
}

const unsubscribe = (client: any) => {
  topics.forEach(topic => {
    client.unsubscribe(topic);
  });
}

const onMessage = (client:any, callBack: any) => {
  client.on("message", (topic: string, message: any, packet:any) => {
    callBack(JSON.parse(new TextDecoder("utf-8").decode(message)));
  });
}

const closeConnection = (client: any) => {
  client.end();
}

const mqttService = {
  getClient,
  subscribe,
  onMessage,
  unsubscribe,
  closeConnection,
};

export default mqttService;
