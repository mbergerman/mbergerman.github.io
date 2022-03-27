---
layout: post
title: Real-time arrhythmia detection
author: Matías Bergerman, Tobías Demeco, Carola Pedrosa, Matías Tripoli
lang: en
lang-ref: deteccion-de-arritmias-en-tiempo-real
featured: true
---

> This project was made for the course *22.46 - Adaptive Signal Processing*, at the Buenos Aires Institute of Technology (ITBA). Professor: Ing. Marc Ressl.

## Part 1: LMS (Least Mean Squares)

### Abstract
In this project we present a real time algorithm for detecting heart arrhythmias, by analyzing morphological variations and frequency changes present in an electrocardiogram (ECG) signal. Both cases are detected in parallel by an implementation of the LMS algorithm, leveraging *a priori* knowledge regarding que QRS complex waveform. The algorithm developed exhibits a sensitivity of 83,3% and a positive predictive value of 96,7% in the analysis of patient 100 from the MIT-BIH arrhythmia database.

### [Project in IEEE journal format](https://github.com/mbergerman/Procesamiento-Adaptativo/blob/main/Proyecto%201/PASA_Proyecto_1_G2.pdf) (Spanish)

### [Code in a Python Notebook](https://github.com/mbergerman/Procesamiento-Adaptativo/blob/main/Proyecto%201/PASA_P1_G2.ipynb) (Spanish)

## Part 2: RLS (Recursive Least Squares)

### Abstract
This complementary project aims to implement structural improvements over the arrhythmia detection system previously presented and perform a comparative analysis between the performance of the LMS and RLS algorithms in identifying morphological anomalies present in ECG signals, which constitute a type of cardiac arrhythmias.

### [Project in IEEE journal format](https://github.com/mbergerman/Procesamiento-Adaptativo/blob/main/Proyecto%202/PASA_Proyecto_2_G2.pdf) (Spanish)

### [Code in a Python Notebook](https://github.com/mbergerman/Procesamiento-Adaptativo/blob/main/Proyecto%202/PASA_P2_G2.ipynb) (Spanish)