import paho.mqtt.client as mqtt
import time
import random

broker="mqtt"
port=1883
MQTT_TOPIC = [('sensor/consumption', 0), ('sensor/en_prod', 0), ('sensor/humidity', 0), ('sensor/temperature', 0)]


topic_ranges = {
    'sensor/humidity': (0.2, 1),
    'sensor/consumption': (0.2, 1),
    'sensor/en_prod': (0.5, 1.2),
    'sensor/temperature': (23.0, 24.3)
}

topic_values = { # Initial values
    'sensor/humidity': 0.5, 
    'sensor/consumption': 0.5,
    'sensor/en_prod': 0.5,
    'sensor/temperature': 23.5
}

def generate_numbers(min_value, max_value, last_value):
    l = 0 if last_value == min_value else -0.1
    r = 0 if last_value == max_value else 0.1
    x = random.uniform(l,r)
    return last_value + x

def get_ranges(topic):
    min, max = topic_ranges[topic]
    last_value = topic_values[topic]
    return generate_numbers(min, max, last_value)


def on_connect(client, userdata, flags, rc):
  print("Connected with result code "+str(rc))

def send_msg(topic, value):
    client.publish(topic, value)

client = mqtt.Client("EOLO")
print("connecting to broker")
client.connect(broker)
client.loop_start()
print("Subscribing to topics:")
for topic, _ in MQTT_TOPIC:
    print('\t- ', topic)
client.subscribe(MQTT_TOPIC)


i = 0
while True:
    i+=1

    if i >= 4:
        i = 0
        time.sleep(2)

    val = get_ranges(MQTT_TOPIC[i][0])
    print(MQTT_TOPIC[i][0], val)
    send_msg(MQTT_TOPIC[i][0], val)

client.loop_stop()
