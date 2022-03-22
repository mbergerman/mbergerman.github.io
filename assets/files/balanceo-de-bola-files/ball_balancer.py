#from gpiozero import Servo
#from gpiozero.pins.pigpio import PiGPIOFactory
from time import sleep, time
from threading import Timer
import cv2
from multiprocessing import Process,Pipe
from matplotlib import pyplot as plt
from matplotlib import animation
import numpy as np

from servo_control import Servo
from ball_tracking import camera_module
from pid import PID
from paho.mqtt import client as mqtt_client

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client

def publish(client, topic, msg):
    result = client.publish(topic, str(msg))
    
    if MQTT_DEBUG_MODE:
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")

#factory = PiGPIOFactory()
servo_x = Servo(gpio=12)
servo_y = Servo(gpio=13)

offset_x = -0.15
offset_y = 0.1

#pid_x = PID(Kp=0.5, Kd=0.3, Ki=1*0.1)
#pid_y = PID(Kp=0.5, Kd=0.3, Ki=1*0.1)
pid_x = PID(Kp=0.5, Kd=1*0.3, Ki=1*0.3, tau=0.05, int_dz=0.07)
pid_y = PID(Kp=0.5, Kd=1*0.3, Ki=1*0.3, tau=0.05, int_dz=0.07)

frame_width = 200.0
center_point_x = frame_width*0.5375
center_point_y = frame_width*3.0/8.0
set_point_x = center_point_x
set_point_y = center_point_y
set_point_mode = 0
set_point_idx = 0

error_x = 0.0
error_y = 0.0
pos_x = set_point_x
pos_y = set_point_y

pos_x_arr = []
pos_y_arr = []

prev_time = time()
min_dt = 0.1
print_min_dt = 1
print_max_dt = 0
temp_dt = 0

prev_time_frame = time()

MQTT_DEBUG_MODE = False

broker = '192.168.0.35'
port = 1883

client_id = 'raspberry-pi'

client = connect_mqtt()
client.loop_start()

parent_conn, child_conn = Pipe()
p = Process(target=camera_module, args=(child_conn,frame_width))
p.start()
sleep(3)

def set_point_change():
    global set_point_mode, set_point_idx
    global center_point_x, center_point_y
    global set_point_x, set_point_y
    
    if set_point_mode == 0:
        set_point_x, set_point_y = center_point_x, center_point_y
    elif set_point_mode == 1:
        if set_point_idx < (20/0.1)/4:
            set_point_x, set_point_y = min(center_point_x + 30, set_point_x + 3), min(center_point_y + 30, set_point_y + 3)
        elif set_point_idx < (20/0.1)/2:
            set_point_x, set_point_y = min(center_point_x + 30, set_point_x + 3), max(center_point_y - 30, set_point_y - 3)
        elif set_point_idx < (20/0.1)*3/4:
            set_point_x, set_point_y = max(center_point_x - 30, set_point_x - 3), max(center_point_y - 30, set_point_y - 3)
        else:
            set_point_x, set_point_y = max(center_point_x - 30, set_point_x - 3), min(center_point_y + 30, set_point_y + 3)
        
    elif set_point_mode == 2:
        set_point_x, set_point_y = center_point_x + np.cos(set_point_idx*2*np.pi / 80)*30, center_point_y + np.sin(set_point_idx*2*np.pi / 80)*30
        
        
    set_point_idx = (set_point_idx + 1)%(20/0.1)
    
    Timer(0.1, set_point_change).start()

set_point_change()

try:
    while True:
        
        if parent_conn.poll():
            pos_x, pos_y = parent_conn.recv()
            publish(client, "Camara/x", pos_x)
            publish(client, "Camara/y", pos_y)
            publish(client, "Set_Point/x", set_point_x)
            publish(client, "Set_Point/y", set_point_y)
            error_x = (pos_x - set_point_x)/(frame_width*3.0/8.0)
            error_y = -(pos_y - set_point_y)/(frame_width*3.0/8.0)
            #error_x = error_x if (abs(error_x) >= 0.1) else 0
            #error_y = error_y if (abs(error_y) >= 0.1) else 0
            
            
            """plt.clf()
            pos_x_arr = np.append(pos_x_arr[1:], pos_x)
            plt.plot(x, pos_x_arr, '.', lw=3)
            plt.draw()
            plt.pause(0.01)"""
            
            """temp_dt = time() - prev_time_frame

            if temp_dt > print_max_dt:
                print_max_dt = temp_dt
                print('max_dt = ', print_max_dt)
                if print_max_dt > 2.5:
                    print_max_dt = 0
            elif temp_dt < print_min_dt:
                print_min_dt = temp_dt
                print('min_dt = ', print_min_dt)
                if print_min_dt < 0.002:
                    print_min_dt = 1"""
            
            prev_time_frame = time()
            
        dt = time() - prev_time
        if(dt >= min_dt):
            prev_time = time()
            
            new_pos_x = pid_x.calculate(error=error_x)[0] + offset_x
            new_pos_y = pid_y.calculate(error=error_y)[0] + offset_y
            servo_x.value(new_pos_x if ((new_pos_x <= 1) and (new_pos_x >= -1)) else new_pos_x/abs(new_pos_x))
            servo_y.value(new_pos_y if ((new_pos_y <= 1) and (new_pos_y >= -1)) else new_pos_y/abs(new_pos_y))
            #print("err_x: ", error_x)
            #print("err_y: ", error_y)
            
            
            
            pos_x_arr.append(pos_y)
            pos_y_arr.append(new_pos_y)
            
            if len(pos_x_arr) == 500:
                file = open('camera_pos.csv', 'w+')
                for x, y in zip(pos_x_arr, pos_y_arr):
                    file.write(f'{x},{y}\n')
                file.close()
                print('Success!')
            
        
        key = cv2.waitKey(1) & 0xFF

        # if the 'q' key is pressed, stop the loop
        if key == ord("q"):
            break
    
    servo_x.value = offset_x
    servo_y.value = offset_y
            

except KeyboardInterrupt:
    print("Program stopped")