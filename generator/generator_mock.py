import paho.mqtt.client as mqtt
import time
import random

broker="mqtt"
port=1883
MQTT_TOPIC = [('sensor/consumption', 0), ('sensor/en_prod', 0), ('sensor/humidity', 0), ('sensor/temperature', 0)]


def generate_numbers(min, max, k=1):
    result = []
    seen = set()
    for i in range(k):
        x = random.uniform(min, max)
        while x in seen:
            x = random.uniform(min, max)
        seen.add(x)
        result.append(x)
    return result

def get_ranges(topic):
    min, max = topic
    return generate_numbers(min, max, 1)[0]


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

topic_ranges = {
    'sensor/humidity': (0.2, 1),
    'sensor/consumption': (0.2, 1),
    'sensor/en_prod': (0.5, 1.2),
    'sensor/temperature': (23.0, 24.3)
}

i = 0
while True:
    i+=1;

    if i >= 4:
        i = 0;
        time.sleep(2);

    val = get_ranges(topic_ranges[MQTT_TOPIC[i][0]])
    send_msg(MQTT_TOPIC[i][0], val)

client.loop_stop()
