---
layout: post
title: CAN Data Logger Electronics Board (CANDLE) 
author: Matías Bergerman, Xi Lin, Pablo Smolkin, María Luz Stewart Harris
lang: en
lang-ref: candle
---

# Downloads

### [Project PCB design files GitHub repository](https://github.com/mbergerman/CAN_Data_Logger_Board)

### [Project firmware GitHub repository](https://github.com/PabloSML/CAN_Data_Logger)

### [Full project report in PDF](https://github.com/mbergerman/CAN_Data_Logger_Board/blob/main/DOC/report/CANDLE%20Board%20-%20Project%20Report%20(Spanish).pdf) (Spanish)

# Project Objectives
## Purpose
The purpose of this project is to provide the R&D Center for Industrial Electronics (CIDEI) and Formula SAE team at ITBA with a data logger for messages transmitted over a CAN bus, to be integrated into their electric go-kart. This device will allow users to extract vehicle data for performance analysis and troubleshooting during the debugging process of their designs.

## Problem Statement
The main design challenge of this product lies in the speed and reliability of data acquisition, as well as its integration with the vehicle. Since the data logger must also record vehicle failure events, the project will focus on three key aspects: ensuring functionality under failure conditions, seamless integration with the vehicle, and thorough validation of the product. In particular, validation testing will be crucial to guarantee the required quality standards.

## Scope
This project involves the design of a CAN data logger for use in the go-kart, along with the necessary analyses to ensure its technological, temporal, financial, and legal feasibility. The design verification will be based on a single non-commercial prototype, which will not be required to meet all final product specifications.

# Key aspects of the design

For the full project description, please read the report linked at the beginning of this page.

## Features summary

These are the main features of the device:

* The CANDLE connects to the vehicles CAN bus and records all message frames together with a timestamp (1 ms precision) in CSV format on an SD card.
* A USB Type-C connector allows for a computer to easily interface with the contents on the SD card to view the recorded messages.
* An overvoltage, reverse voltage, and ESD protection circuit ensure the safety of the device. The device functions with a voltage in the range 8V~30V and withstands voltages in the range -30V~60V.
* In the event of a sudden power outage, the CANDLE board is able to store all buffered CAN messages safely on the SD card (using bulk capacitors).

## Functional interface diagram

<p style="text-align:center">
    <img src="/images/candle-board/functional-interface-diagram.png" alt="Functional Interface Diagram" style="width:80%">
</p>

## Firmware architecture diagram

<p style="text-align:center">
    <img src="/images/candle-board/firmware-architecture.png" alt="Firmware Architecture" style="width:60%">
</p>

## Realistic views

<p style="text-align:center">
<img src="/images/candle-board/PCB_3D_Top.png" width="45%"/>
<br>
<img src="/images/candle-board/PCB_3D_Bottom.png" width="45%"/> 
</p>

## Box assembly

<p style="text-align:center">
<img src="/images/candle-board/box-3d.png" width="60%"/>
</p>

## Pictures of the finished prototype

<p style="text-align:center">
<img src="/images/candle-board/box-photo-1.png" width="45%"/>
<br>
<img src="/images/candle-board/box-photo-2.png" width="45%"/>
</p>

## Prototype mounted on the go-kart

<p style="text-align:center">
<img src="/images/candle-board/karting-photo-1.jpg" width="80%"/>
</p>