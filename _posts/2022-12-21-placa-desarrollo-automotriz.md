---
layout: post
title: Placa de desarrollo ARM Cortex para aplicaciones automotrices
author: Matías Bergerman
lang: es
lang-ref: development-board-automotive
---

## Resumen

Este proyecto fue desarrollado dentro del Centro de I+D en Electrónica Industrial del [ITBA](https://www.itba.edu.ar/). El objetivo es diseñar una placa de desarrollo con un microcontrolador que proporcionara funcionalidades útiles para aplicaciones automotrices, como una conexión de bus CAN. Esta placa de desarrollo se utilizará para proyectos de investigación en la universidad y reemplazará varios módulos en el auto eléctrico pequeño que actualmente utilizan los investigadores en el laboratorio.

Las principales características de la placa de desarrollo son:

* Se conecta a través de un bus CAN con el resto de los módulos del automóvil y contiene todos los drivers y transceptores necesarios para este propósito.
* La alimentación proviene del bus CAN, se regula y se filtra para alimentar la placa.
* La placa de desarrollo tiene un microcontrolador LPC55S06 con su correspondiente oscilador, conector de programador/debugging, headers para permitir una conexión tipo *shield* a cada pin MCU y un header de comunicación serie.

<p style="text-align:center">
PCB fabricado<br>
<img src="/images/development-board-automotive-images/LPC55S06.jpg" alt="Manufactured PCB" style="display:inline-block;width:60%;margin:1%;">
</p>

<p style="text-align:center">
Capturas de pantalla del PCB en Altium Designer<br>
<img src="/images/development-board-automotive-images/pcb_2d.png" alt="PCB design 2D" style="display:inline-block;width:45%;margin:1%;">
<img src="/images/development-board-automotive-images/pcb_3d.png" alt="PCB design 3D" style="display:inline-block;width:45%;margin:1%;">
</p>
