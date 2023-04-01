---
layout: post
title: Cloud-connected building access control device with RTOS
author: Matías Bergerman, Pedro Carranza Vélez, Pablo González, Milagros Moutin
lang: en
lang-ref: control-acceso-rtos
---

> This project was made for the course *22.99 - Microprocessor Laboratory*, at the Buenos Aires Institute of Technology (ITBA). <br>**Professor:** Ing. Daniel Jacoby.

## Summary

This project consists of a small device designed to manage access to a building using magnetic cards and access pins. The main features of this project are:

* The device is controlled using the ARM Cortex microcontroller present in the Freedom-K64F development board.
* The firmware was developed using the [μC/OS-III](https://github.com/weston-embedded/uC-OS3) real time operating system.
* All drivers for internal peripherals and external hardware were developed from the ground up.
* The device connects over UART to a desktop computer running a gateway for a [ThingSpeak](https://thingspeak.com/) online server which displays device statistics.
* Users can gain access with the use of a magnetic card, or alternatively a pin code which is entered using a rotary encoder.
* The interface consists of 7 segment displays.

All project files can be downloaded from the [GitHub repo](https://github.com/mbergerman/Labo-de-Micros/tree/main/TPS/TP4).

<p style="text-align:center">
Diagram of the RTOS application developed:<br>
<img src="https://raw.githubusercontent.com/mbergerman/Labo-de-Micros/main/TPS/TP4/Diagrama%20en%20Bloques%20TP4_G1.png" alt="RTOS Diagram" style="display:inline-block;width:100%;margin:1%;">
</p>

