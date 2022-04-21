import paho.mqtt.client as mqtt
import time
import random

broker="mqtt"
port=1883
MQTT_TOPIC = [('sensor/consumption', 0), ('sensor/en_prod', 0), ('sensor/humidity', 0), ('sensor/temperature', 0)]

def on_connect(client, userdata, flags, rc):
  print("Connected with result code "+str(rc))

def send_msg(topic, value):
    client.publish(topic, value);

client = mqtt.Client("EOLO")
print("connecting to broker")
client.connect(broker)
client.loop_start()
print("Subscribing to topics:");
for topic, _ in MQTT_TOPIC:
    print('\t- ', topic);
client.subscribe(MQTT_TOPIC);
i = 0
while True:
    i+=1;

    if i >= 4:
        i = 0;
        time.sleep(0.5);

    val=random.uniform(5.75,28.55)
    send_msg(MQTT_TOPIC[i][0], val)

client.loop_stop()