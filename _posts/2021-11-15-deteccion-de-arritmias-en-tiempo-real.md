---
layout: post
title: Detección de arritmias en tiempo real
author: Matías Bergerman, Tobías Demeco, Carola Pedrosa, Matías Tripoli
lang: es
lang-ref: deteccion-de-arritmias-en-tiempo-real
---

> Este trabajo fue realizado para la materia *22.46 - Procesamiento Adaptativo de Señales*, del Instituto Tecnológico de Buenos Aires.<br>**Profesor:** Ing. Marc Ressl.

## Parte 1: LMS (Least Mean Squares)

### Resumen
En este trabajo se presenta un algoritmo de tiempo real para la detección de arritmias, analizando variaciones morfológicas y cambios de frecuencia presentes en una señal de electrocardiograma (ECG). Ambos casos son detectados de forma paralela mediante implementaciones del algoritmo LMS, aprovechando las características conocidas *a priori* sobre la forma de onda del complejo QRS. El algoritmo desarrollado presenta una sensibilidad del 85,3% y un valor predictivo positivo del 96,7% analizado sobre el paciente 100 de la base de datos de arritmias MIT-BIH.

### [Trabajo en formato paper IEEE](https://github.com/mbergerman/Procesamiento-Adaptativo/blob/main/Proyecto%201/PASA_Proyecto_1_G2.pdf)

### [Código en formato Python Notebook](https://github.com/mbergerman/Procesamiento-Adaptativo/blob/main/Proyecto%201/PASA_P1_G2.ipynb)

## Parte 2: RLS (Recursive Least Squares)

### Resumen
En el presente trabajo complementario se busca implementar mejoras estructurales en el sistema de detección de arritmias previamente presentado y realizar una comparación entre el rendimiento de los algoritmos LMS y RLS para la identificación de anomalías morfológicas presentes en una señal de ECG, las cuales constituyen un tipo de arritmia cardíaca.

### [Trabajo en formato IEEE](https://github.com/mbergerman/Procesamiento-Adaptativo/blob/main/Proyecto%202/PASA_Proyecto_2_G2.pdf)

### [Código en formato Python Notebook](https://github.com/mbergerman/Procesamiento-Adaptativo/blob/main/Proyecto%202/PASA_P2_G2.ipynb)