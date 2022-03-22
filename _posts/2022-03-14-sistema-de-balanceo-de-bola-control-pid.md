---
layout: post
title: Implementación de un sistema de balanceo de bola mediante control PID
author: Matías Bergerman, Phillipe Dutriez, Francisco Ledesma, Xi Lin, Pablo Smolkin
lang: es
lang-ref: sistema-de-balanceo-de-bola-control-pid
---

> Este trabajo fue realizado para la materia *22.85 - Sistemas de Control*, del Instituto Tecnológico de Buenos Aires. Profesor: Ing. Víctor Nasini.

# Introducción

Como proyecto final de la materia de Sistemas de Control se eligió realizar un sistema de balanceo de bola mediante un control del tipo Proporcional, Integrativo y Derivativo (PID). El objetivo del mismo es balancear una bola sobre una plataforma plana regulando la inclinación de la misma respecto de dos ejes ortogonales.

<p style="text-align:center">
<img src="images/balanceo-de-bola-images/ball_balancer_1.gif" alt="Gif del dispositivo" style="max-height: 30rem;">
</p>

La posición de la bola es determinada mediante una cámara, la cual se encuentra colocada sobre la plataforma, cuya imagen se procesa utilizando una Raspberry Pi. A partir de la posición de la bola medida y la posición deseada se determina cómo debe inclinarse la plataforma mediante dos servo motores que modifican el ángulo de la misma en sus dos ejes ortogonales de forma independiente. Por otro lado, la Raspberry Pi se encuentra conectada mediante internet a un servidor [MQTT](https://mqtt.org/) de forma tal que envía constantemente datos en tiempo real sobre la posición de la bola medida y la posición deseada. Estos datos pueden ser analizados desde cualquier terminal conectada al mismo servidor, y ser graficados en tiempo real mediante un programa Python.

<p style="text-align:center">
<img src="images/balanceo-de-bola-images/ball_balancer_2.gif" alt="Server GUI GIF" style="max-height: 20rem;">
</p>

# Hardware

Para el armado del proyecto se utilizó una plataforma de madera de 25cm x 25cm que fue sujetada mediante un cardán impreso en 3D:

<p style="text-align:center">
<img src="images/balanceo-de-bola-images/cardan.png" alt="Modelo del cardán" style="max-height: 20rem;">
</p>

Se utilizó una cámara [Logitech C920 HD PRO](https://www.logitech.com/es-roam/products/webcams/c920-pro-hd-webcam.960-000764.html) para la adquisición de la posición de la bola mediante conexión USB. Se utilizó un tubo de PVC en forma de L para lograr colocar la cámara por encima de la plataforma de forma tal que se encuentre centrada respecto de la misma.

Para el control de la inclinación de la mesa se utilizaron 2 servomotores [MG90S](https://www.electronicoscaldas.com/datasheet/MG90S_Tower-Pro.pdf) conectados a la plataforma mediante un alambre rígido para transmitir el movimiento de los motores.

<p style="text-align:center">
<img src="images/balanceo-de-bola-images/Table_Up.png" alt="Foto del dispositivo" style="max-height: 20rem;">
</p>

Se utilizó una [Raspberry Pi 4B](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) para el control de los servomotores y la adquisición y procesamiento de la información de la cámara.


# Software

## Detección de la bola

Para lograr obtener la posición de la bola, las imágenes capturadas por la cámara web son analizadas por un programa en Python que utiliza [OpenCV](https://opencv.org/). Para esto se adaptó un popular código ejemplo que detecta objetos circulares del color indicado en una imagen.

Los pasos que sigue este algoritmo son:
- Reducir la resolución de la imagen para acelerar el tiempo de procesamiento.
- Aplicar un \textit{gaussian blur} a la imagen.
- Transformar la imagen RGB al espacio de color HSV.
- Aplicar una máscara que preserve únicamente los píxeles cuyos valores HSV se encuentren dentro del rango apropiado del color de la bola.
- Aplicar una serie de "erosiones" y "dilataciones" para remover cualquier pequeña mancha que haya quedado.
- Buscar el contorno más grande que haya quedado en la imagen.
- Encontrar el centroide del círculo envolvente del contorno.

## Control de motores
Los servomotores utilizados cuentan con terminales de alimentación independientes de la señal de datos. Es por esto que los mismos pueden ser controlados por la Raspberry Pi sin la necesidad de utilizar hardware adicional para el control de los motores.

Para que cada motor se posicione en el ángulo deseado, se debe generar una señal PWM con un *duty-cycle* apropiado. La Raspberry Pi cuenta con controladores de PWM por hardware los cuales fueron empleados para esta tarea.

## PID

Para la implementación del PID simplemente se utilizaron las siguientes instrucciones:

```python
dt = time() - previous_time
previous_time = time()

P = error
I = I + (error * dt)
D = (error - previous_error) / dt

output = (Kp * P) + (Ki * I) + (Kd * D)
```

Sin embargo, se observaron inconvenientes con esta implementación que debieron ser resueltos. El principal problema es que la medición de la posición de la bola tiene presente ruido significativo, debido principalmente a la vibración del dispositivo, la precisión de la cámara, la latencia variable del sistema y las pequeñas inconsistencias en el algoritmo de detección. Este ruido de alta frecuencia se amplifica por la componente derivativa, y como consecuencia la señal enviada a los servomotores es ruidosa provocando que el sistema tenga vibraciones notorias. El problema fue solucionado colocando únicamente a la entrada del bloque derivativo un filtro pasa-bajos para reducir la amplitud del ruido de alta frecuencia que este recibe. Para simplificar la implementación del filtro simplemente se utilizó una media móvil de 5 "taps".

Otro problema encontrado es el *windup* del componente integrativo. El valor acumulado del error podía crecer más allá de lo que es razonable, y debía ser saturado. Esto previene que si por alguna razón la bola permanece durante un largo tiempo alejada del \textit{set point}, la integral no crezca ilimitadamente imposibilitando que cuando se libere a la bola esta se estabilice en el objetivo.

Por último, se encontró que existe una "zona muerta" en el sistema. Esto es, si la bola se encuentra detenida se requiere un ángulo de inclinación mínimo para que esta comience a moverse. Esto provoca que pequeños errores se acumulen en la integral y luego de cierto tiempo la bola sea disparada cuando la inclinación de la plataforma supera el umbral mínimo que provoca el movimiento de la bola. Para mitigar este problema se aplicó una "zona muerta" al valor del error que ingresa al bloque integrador, de forma tal que ignore valores muy pequeños del error.

El diagrama resultante es el siguiente:

<p style="text-align:center">
<img src="images/balanceo-de-bola-images/PID Modificado.png" alt="Diagrama del algoritmo PID modificado" style="max-height: 20rem;">
</p>

## Transmisión de datos en tiempo real
Para permitir la transmisión de datos en tiempo real se implementó un cliente sobre la Raspberry Pi que utiliza el protocolo MQTT comúnmente usado en el ámbito de IoT. De esta forma, se envía información a un servidor externo la cual es accesible por cualquier otro cliente MQTT conectado al mismo servidor. Estos datos son recibidos mediante una terminal y graficados en el tiempo utilizando Python. En la figura podemos observar la aplicación desarrollada para este propósito. En la figura de la izquierda podemos visualizar la posición actual de la bola registrada por la cámara sobre la plataforma por un circulo verde y la posición deseada señalizada por una cruz. Además se puede observar el recorrido previo de la bola representada por una estela gris. Luego, en las figuras de la derecha podemos observar la misma información pero en cada eje por separado y en el tiempo. En este ejemplo, la bola intenta describir una circunferencia con su trayectoria. Esto se ve representado como una señal senoidal para cada eje.

<p style="text-align:center">
<img src="images/balanceo-de-bola-images/server_gui.png" alt="Server GUI" style="width: 100%;">
</p>

## Código del proyecto

El programa se implementó en Python, utilizando la biblioteca `multiprocessing` para lograr la ejecución concurrente de los diferentes módulos del sistema, los cuales
se comunican entre sí usando Pipes. Los archivos se pueden descargar a continuación:


<a href="/assets/files/balanceo-de-bola-files/ball_balancer.py" download>
  ⬇️ Descargar `ball_balancer.py`
</a>

<a href="/assets/files/balanceo-de-bola-files/ball_tracking.py" download>
  ⬇️ Descargar `ball_tracking.py`
</a>

<a href="/assets/files/balanceo-de-bola-files/servo_control.py" download>
  ⬇️ Descargar `servo_control.py`
</a>

<a href="/assets/files/balanceo-de-bola-files/pid.py" download>
  ⬇️ Descargar `pid.py`
</a>

Además, usamos un código para calibrar los umbrales HSV que componen la máscara binaria en el proceso de detección de bola:

<a href="/assets/files/balanceo-de-bola-files/range_detector.py" download>
  ⬇️ Descargar `range_detector.py`
</a>

Para el graficador se usó el broker de MQTT [mosquitto](https://mosquitto.org/download/), y se implementó el siguiente código:

<a href="/assets/files/balanceo-de-bola-files/mqtt_client.py" download>
  ⬇️ Descargar `mqtt_client.py`
</a>

<a href="/assets/files/balanceo-de-bola-files/plot_realtime.py" download>
  ⬇️ Descargar `plot_realtime.py`
</a>
