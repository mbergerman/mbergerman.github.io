---
layout: post
title: Fresadora CNC de diseño propio
author: Matías Bergerman, Joel Gottfried
lang: es
lang-ref: fresadora-cnc
---

## Resumen

Este proyecto consiste en una fresadora CNC hecha principalmente a partir de piezas de madera cortadas por laser y piezas de plástico impresas en 3D. El objetivo fue armar una cortadora CNC de bajo presupuesto para poder construir piezas fácilmente para otros proyectos. Las principales características del proyecto son:

* El movimiento es realizado mediante motores stepper con tornillos sin fin, y los ejes se montan sobre varillas de acero pulidas utilizando rodamientos lineales.
* Utiliza una fresa de 500W con un mandril ER11 y fuente de alimentación independiente.
* El control de la máquina se realiza mediante una placa [RAMPS 1.4](https://reprap.org/wiki/RAMPS_1.4) montada sobre un Arduino Mega.
* El firmware de control es [Marlin](https://marlinfw.org/) con modificaciones propias para ajustarse al caso de uso de una fresadora.
* El modelado tridimensional del proyecto fue realizado en OnShape.

Los modelos 3D de las diversas piezas se pueden descargar a continuación:

<a class="download_link" href="/assets/files/fresadora-cnc-files/CNC Mill.step" download>
  ⬇️ Descargar `CNC Mill.step`
</a>

<p style="text-align:center">
Fresadora CNC ensamblada<br>
<img src="images/fresadora-cnc-images/foto_fresadora_cnc_1.jpg" alt="Foto de la fresadora 1" style="display:inline-block;width:45%;margin:1%;">
<img src="images/fresadora-cnc-images/foto_fresadora_cnc_2.jpg" alt="Foto de la fresadora 2" style="display:inline-block;width:45%;margin:1%;">
</p>

<p style="text-align:center">
Diseño 3D en OnShape<br>
<img src="images/fresadora-cnc-images/3d_assembly.png" alt="Foto del diseño 3d" style="display:inline-block;width:50%;margin:1%;">
</p>

<p style="text-align:center">
Animaciones 3D del diseño<br>
<img src="images/fresadora-cnc-images/x_axis.gif" alt="Gif del diseño 3d" style="display:inline-block;width:45%;margin:1%;">
<img src="images/fresadora-cnc-images/y_axis.gif" alt="Gif del diseño 3d" style="display:inline-block;width:45%;margin:1%;">
</p>
