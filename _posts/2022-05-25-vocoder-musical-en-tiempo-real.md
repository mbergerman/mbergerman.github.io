---
layout: post
title: Vocoder musical en tiempo real mediante LPC
author: Matías Bergerman, Lucas Agustín Kammann, Rafael Nicolás Trozzo
lang: es
lang-ref: vocoder-musical-en-tiempo-real
---

> Este trabajo fue realizado para la materia *22.47 - Procesamiento de Voz*, del Instituto Tecnológico de Buenos Aires. Profesor: Ing. Marc Ressl.

## Presentación del proyecto en video

<div class="video-wrap">
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/WvF8JJHSznA"></iframe>
  </div>
</div>

## Resumen
En este trabajo, se implementa un vocoder de tiempo real. Para ello, se usa el algoritmo LPC para estimar en tiempo real el filtro de una voz capturada mediante un microfono, y se la reproduce reemplazando el generador por una onda sintetizada en base a los comandos de un controlador MIDI.

### [Trabajo en formato paper IEEE](https://github.com/Kammann123/vocoder/blob/main/doc/vocoder_report.pdf)

### [Código de la aplicación en Python](https://github.com/Kammann123/vocoder/tree/main/src)

