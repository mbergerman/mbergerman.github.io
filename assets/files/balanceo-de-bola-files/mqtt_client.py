from paho.mqtt import client as mqtt_client
import random
import multiprocessing as mp
from plot_realtime import plot_realtime

MQTT_DEBUG_MODE = False

broker = 'localhost'
port = 1883

client_id = f'python-mqtt-{random.randint(0, 100)}'

queue = mp.Queue()

def on_message(client, userdata, msg):
    global queue

    if MQTT_DEBUG_MODE:
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

    queue.put(f'{msg.topic},{msg.payload.decode()}')

def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    client.subscribe("Camara/x")
    client.subscribe("Camara/y")
    client.subscribe("Set_Point/x")
    client.subscribe("Set_Point/y")
    client.on_message = on_message


def run():
    plot_process = mp.Process(target=plot_realtime, args=(queue,))
    plot_process.start()
    
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    run()