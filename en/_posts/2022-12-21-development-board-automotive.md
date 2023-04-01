---
layout: post
title: ARM Cortex custom development board for automotive applications
author: Matías Bergerman
lang: en
lang-ref: development-board-automotive
---

## Summary

This project was developed within the R&D Center for Industrial Electronics at [ITBA](https://www.itba.edu.ar/). The goal was to design a microcontroller development board that provides useful features for automotive applications, such as a CAN bus connection. This development board is to be used for research projects in the university, and will replace several modules in the small electric car which is currently being used by researchers at the lab.

The main features of the development board are:

* It connects via a CAN bus to the rest of the car modules, and contains all required drivers and transcievers for this purpose.
* The power from the CAN bus power lines is regulated and filtered to supply the board.
* The development board has an LPC55S06 microcontroller with its corresponding oscillator, programmer/debugger connector, headers to allow for a shield connection to every MCU pin and a serial connector header. 

<p style="text-align:center">
Manufactured PCB<br>
<img src="/images/development-board-automotive-images/LPC55S06.jpg" alt="Manufactured PCB" style="display:inline-block;width:60%;margin:1%;">
</p>

<p style="text-align:center">
Screen captures of the PCB from Altium Designer<br>
<img src="/images/development-board-automotive-images/pcb_2d.png" alt="PCB design 2D" style="display:inline-block;width:45%;margin:1%;">
<img src="/images/development-board-automotive-images/pcb_3d.png" alt="PCB design 3D" style="display:inline-block;width:45%;margin:1%;">
</p>
