---
layout: post
title: Dispositivo de control de acceso con RTOS conectado a la nube
author: Matías Bergerman, Pedro Carranza Vélez, Pablo González, Milagros Moutin
lang: es
lang-ref: control-acceso-rtos
---

> Este trabajo fue realizado para la materia *22.99 - Microprocessor Laboratory*, del Instituto Tecnológico de Buenos Aires.<br>**Profesor:** Ing. Daniel Jacoby.

## Resumen

Este proyecto consiste en un dispositivo diseñado para gestionar el acceso a un edificio mediante tarjetas magnéticas y pines de acceso. Las principales características del proyecto son:

* El dispositivo es controlado usando el microcontrolador ARM Cortex presente en la placa de desarrollo Freedom-K64F.
* El firmware se desarrolló con el RTOS [μC/OS-III](https://github.com/weston-embedded/uC-OS3).
* Todos los drivers para periféricos internos y hardware externo se desarrollaron desde cero.
* El dispositivo se conecta a través de UART a una computadora de escritorio que corre un gateway con un servidor de [ThingSpeak](https://thingspeak.com/) para mostrar las estadísticas del dispositivo.
* Los usuarios pueden obtener acceso con el uso de una tarjeta magnética o, alternativamente, un código PIN que se ingresa mediante un encoder rotatorio.
* La interfaz consta de displays de 7 segmentos.

Todos los archivos del proyecto se pueden descargar desde el [repositorio de GitHub](https://github.com/mbergerman/Labo-de-Micros/tree/main/TPS/TP4).

<p style="text-align:center">
Diagrama de la aplicación RTOS desarrollada:<br>
<img src="https://raw.githubusercontent.com/mbergerman/Labo-de-Micros/main/TPS/TP4/Diagrama%20en%20Bloques%20TP4_G1.png" alt="RTOS Diagram" style="display:inline-block;width:100%;margin:1%;">
</p>

