---
layout: post
title: Design of a Flyback power supply
author: Matías Bergerman, Franco Moriconi, Carola Pedrosa, Franco Scapolla
lang: en
lang-ref: fuente-flyback
---

# Design of the power supply

The objective of this work is to design a Flyback power supply with an input of $220\ V_{AC_{RMS}}$ and an output of $12\ V_{DC}$. This design uses a feedback circuit with an optocoupler and the TNY290PG[^1] integrated circuit. According to the characteristics of the IC, a target output power of $30W$ was determined.


<p style="text-align:center">
    <img src="/images/fuente-flyback-images/foto_flyback_1.jpg" alt="" style="max-width:45%;max-height=30rem;display:inline-block;margin:1%;">
    <img src="/images/fuente-flyback-images/foto_flyback_2.jpg" alt="" style="max-width:45%;max-height=30rem;display:inline-block;margin:1%;">
</p>

To begin with, we started with the typical application circuit provided by the manufacturer, which can be seen below:
<p style="text-align:center">
   <img src="/images/fuente-flyback-images/TNY Flyback.svg" alt="" style="background-color:white;width:50%;max-height=30rem;">
   Typical application circuit provided by the manufacturer.
</p>

Starting from this circuit, a voltage rectifier is added to the input, a resistor to detect the *under-voltage* between the line and the EN/UV pin of the TNY290PG, and a variable resistor in series with the optocoupler LED to allow for a fine adjustment of the output voltage. Additionally, a resistor is added in series with the transformer primary coil to perform current measurements, as well as various voltage measurement pins. The BP capacitor is selected according to the desired current limiting, and the *snubber* circuit is designed according to the Fairchild Semiconductors application note number AN4147[^2]. The only modification that is made to it is the addition of a 100 ohm resistor in series with the snubber diode in order to attenuate the resonance of the circuit between the snubber capacitor and the transformer inductances at the moment of switching. The final circuit can be seen below:


<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Main_Sch.png" alt="" style="background-color:white;width:90%;max-height=30rem;">
   Circuit design.
</p>

To implement this circuit on a PCB, the indications given by the manufacturer of the TinySwitch integrated were followed:

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Recomendaciones PCB.png" alt="" style="background-color:white;width:80%;max-height=30rem;">
   Manufacturer design recommendations.
</p>

An image of the designed PCB can be seen below:

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Main_PCB.png" alt="" style="background-color:white;width:80%;max-height=30rem;">
</p>
<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Main_PCB_3d.png" alt="" style="background-color:white;width:80%;max-height=30rem;">
</p>

The main design parameters can be seen in the Table below. Some of these parameters had to be slightly modified according to the availability of components.

<div class="scrollbox">
<table>
    <tr>
        <td><b>Parameter</b></td>
        <td><b>Value</b></td>
        <td><b>Unit</b></td>
    </tr>
    <tr>
        <td>Output Power ($P_o$)</td>
        <td>30</td>
        <td>W</td>
    </tr>
    <tr>
        <td>Output Voltage ($V_o$)</td>
        <td>12</td>
        <td>V</td>
    </tr>
    <tr>
        <td>Input Voltage ($V_i$)</td>
        <td>311</td>
        <td>V</td>
    </tr>
    <tr>
        <td>Typical Duty-Cycle</td>
        <td>0,4</td>
        <td></td>
    </tr>
    <tr>
        <td>Switching frequency ($f_s$)</td>
        <td>132</td>
        <td>kHz</td>
    </tr>
    <tr>
        <td>Primary inductance ($L_1$)</td>
        <td>5</td>
        <td>mHy</td>
    </tr>
    <tr>
        <td>TinySwitch-4 $I_{LIMIT}$</td>
        <td>0,75</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Core $A_L$</td>
        <td>5200</td>
        <td>nHy/N²</td>
    </tr>
    <tr>
        <td>Current Density ($J$)</td>
        <td>3</td>
        <td>A/mm²</td>
    </tr>
    <tr>
        <td>Primary effective area</td>
        <td>76,8</td>
        <td>mm²</td>
    </tr>
    <tr>
        <td>Secondary effective area</td>
        <td>76,8</td>
        <td>mm²</td>
    </tr>
    <tr>
        <td>$B_{sat}$</td>
        <td>200</td>
        <td>mT</td>
    </tr>
    <tr>
        <td>Core $A_{min}$</td>
        <td>229</td>
        <td>mm²</td>
    </tr>
    <tr>
        <td>Available wire radius ($r_2$)</td>
        <td>0,3</td>
        <td>mm</td>
    </tr>
    <tr>
        <td>Output voltage ripple</td>
        <td>1</td>
        <td>%</td>
    </tr>
    <tr>
        <td>Switch breakdown voltage</td>
        <td>725</td>
        <td>V</td>
    </tr>
    <tr>
        <td>Measured leakage inductance</td>
        <td>177,3</td>
        <td>uHy</td>
    </tr>
    <tr>
        <td>$C_{SN}$ voltage ripple</td>
        <td>7,3</td>
        <td>%</td>
    </tr>
</table>
</div>

From the design parameters, the rest of the parameters necessary to carry out an implementation of the circuit were calculated. The results and the components selected to suit them can be seen in the following Tables:

<div class="scrollbox">
<table>
    <tr>
        <td><b>Component</b></td>
        <td><b>Value</b></td>
    </tr>
    <tr>
        <td>Output diode</td>
        <td>MUR460</td>
    </tr>
    <tr>
        <td>Output capacitor</td>
        <td>47uF</td>
    </tr>
    <tr>
        <td>BP capacitor</td>
        <td>1uF</td>
    </tr>
    <tr>
        <td>Full bridge rectifier</td>
        <td>W10M</td>
    </tr>
    <tr>
        <td>Input capacitor</td>
        <td>47uF</td>
    </tr>
    <tr>
        <td>Optocoupler</td>
        <td>4N25</td>
    </tr>
    <tr>
        <td>Zenner diode</td>
        <td>10V</td>
    </tr>
    <tr>
        <td>Variable resistor</td>
        <td>20 kOhm</td>
    </tr>
    <tr>
        <td>$R_{SN}$</td>
        <td>22 kOhm</td>
    </tr>
    <tr>
        <td>$R_{SN}$ power</td>
        <td>5 W</td>
    </tr>
    <tr>
        <td>$C_{SN}$</td>
        <td>4,7 nF</td>
    </tr>
    <tr>
        <td>Snubber diode</td>
        <td>FR107</td>
    </tr>
</table>
</div>
<br>
<div class="scrollbox">
<table>
    <tr>
        <td><b>Parameter</b></td>
        <td><b>Equation</b></td>
        <td><b>Value</b></td>
        <td><b>Unit</b></td>
    </tr>
    <tr>
        <td>Average output current</td>
        <td>$P_o/V_o$</td>
        <td>2,5</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Transformer turn relation ($N_1/N_2$)</td>
        <td>$1/\left(\frac{V_o}{V_i}\cdot\frac{(1-D)}{D}\right)$</td>
        <td>17,2778</td>
        <td></td>
    </tr>
    <tr>
        <td>Output current measured during switch turn-off ($I_{X_2}$)</td>
        <td>$I_{o_{avg}}/(1-D)$</td>
        <td>4,1667</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Output current measured during switch turn-on ($I_{X_1}$)</td>
        <td>$I_{X_2}\cdot\frac{N_2}{N_1}$</td>
        <td>241,2</td>
        <td>mA</td>
    </tr>
    <tr>
        <td>Average input current ($I_{i_{avg}}$)</td>
        <td>$I_{X_1}\cdot D$</td>
        <td>96,5</td>
        <td>mA</td>
    </tr>
    <tr>
        <td>Input power</td>
        <td>$V_o\cdot I_{i_{avg}}$</td>
        <td>30</td>
        <td>W</td>
    </tr>
    <tr>
        <td>Peak input current ($\hat{I_i}$)</td>
        <td>$I_{X_1}+(D\cdot T_s/2\cdot V_i/L_1)$</td>
        <td>335,4</td>
        <td>mA</td>
    </tr>
    <tr>
        <td>Number of turns for the primary side ($N_1$)</td>
        <td>$\sqrt{L_1/A_L}$</td>
        <td>31</td>
        <td></td>
    </tr>
    <tr>
        <td>Number of turns for the secondary side ($N_2$)</td>
        <td>$N_1 / \frac{N_1}{N_2}$</td>
        <td>1,8</td>
        <td></td>
    </tr>
    <tr>
        <td>Skin depth ($d$)</td>
        <td>$66/\sqrt{f_s}$</td>
        <td>0,1817</td>
        <td>mm</td>
    </tr>
    <tr>
        <td>Primary wire minimum radius ($r_1$)</td>
        <td>$\frac{I_{i_{avg}}/J+d^2\cdot\pi}{2\cdot d\cdot\pi}$</td>
        <td>0,1190</td>
        <td>mm</td>
    </tr>
    <tr>
        <td>Inductance of the secondary side ($L_2$)</td>
        <td>$\frac{N_1/N_2}{ {L_1}^2 }$</td>
        <td>16,7</td>
        <td>uHy</td>
    </tr>
    <tr>
        <td>Secondary peak current ($\hat{I_2}$)</td>
        <td>$\hat{I_i}\cdot \frac{N_1}{N_2}$</td>
        <td>5,79</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Secondary minimum current ($I_{2_{min}}$)</td>
        <td>$2\cdot I_{X_2} - \hat{I_2}$</td>
        <td>2,54</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Output RMS current ($I_{o_{RMS}}$)</td>
        <td>$\sqrt{(1-D)/3\cdot(\hat{I_2}^2+\hat{I_2}\cdot I_{2_{min}} + {I_{2_{min}}}^2)}$</td>
        <td>3,31</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Minimum number of turns for the secondary</td>
        <td>$\frac{I_{o_{RMS}}}{(r_2^2\cdot\pi-{(r_2-d)}^2\cdot\pi)\cdot J}$</td>
        <td>4,6194</td>
        <td></td>
    </tr>
    <tr>
        <td>$V_{switch}$</td>
        <td>$V_i + V_o \cdot \frac{N_1}{N_2}$</td>
        <td>518,33</td>
        <td>V</td>
    </tr>
</table>
</div>

# Circuit simulation
Due to the lack of an appropriate SPICE model to simulate the behavior of the TinySwitch-4, the circuit simulations had to be carried out without taking into account the feedback loop. The commutation was carried out with an ideal switch controlled with a constant duty-cycle PWM. Simulations were carried out both with a leakage inductance value in the transformer equal to 0 (ideal case), and with a value of $0.178 mH$, which corresponds to that measured in the built transformer; in this way it is possible to compare both cases and verify the effects of the leakage inductance.

The coupling coefficient $K$ necessary to carry out the simulation can be found using the following equation:

$$L_d=L\cdot(1-K^2)$$

Therefore, it is found that the value of $K$ is $1$ for the ideal case and $0.982$ in the case of the real transformer.

The circuit used can be seen below. The output is connected to GND so that the simulation can be calculated using numerical methods.

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Circuito Spice.png" alt="" style="width:80%;max-height=30rem;">
   Circuito simulado.
</p>

The following figure shows the transformer currents. In the real case, an oscillation can be notices during the switch OFF period caused by the resonances with the snubber circuit. During the ON period, a higher frequency oscillation is observed, which in this case is due to resonance with the parasitic capacitance of the output diode. By replacing the output diode with an ideal one, the higher frequency oscillations disappear.

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Transformer currents.png" alt="" style="width:80%;max-height=30rem;">
   Transformer current simulation.
</p>

The following Figures show the output voltage, which stabilizes at a value below $12 V$ in both cases. For the ideal transformer, the difference with the target voltage is due to the output diode voltage drop, while in the real case higher losses appear due to leakage inductance and snubber circuit losses. According to the circuit design, this will be compensated through the feedback loop, increasing the effective duty-cycle and establishing $12 V$ at the output. On the other hand, an overshoot of approximately $15 V$ is noticeable at the start, which must also be compensated through the control carried out by the TinySwitch-4.

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Sim Vo full.png" alt="" style="width:80%;max-height=30rem;">
   Output voltage simulation.
</p>

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Sim Vo zoom.png" alt="" style="width:80%;max-height=30rem;">
   Output voltage simulation.
</p>

The following Figures show the voltage on the switch, which according to the limitations of the TNY290PG should never exceed $725 V$. In both cases, the steady state voltage value coincides with the results presented in the previous section, below the mentioned limit. However, an overshoot occurs at startup which has the potential to damage the integrated circuit. This should not be a problem in the real implementation since, as mentioned, the control that the TinySwitch-4 performs on the output voltage prevents the appearance of such a high voltage at the input.

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Sim Vsw full.png" alt="" style="width:80%;max-height=30rem;">
   Switch voltage simulation.
</p>

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Sim Vsw zoom.png" alt="" style="width:80%;max-height=30rem;">
   Switch voltage simulation.
</p>

The following Figure shows the currents present in the snubber circuit. The initial current peak caused by the leakage inductance can be noticed. Moreover, the same oscillations are observed as in the primary current due to the resonance between these elements. Finally, a very pronounced negative peak is observed which can be attributed to the recovery current of the snubber circuit diode, which in the real implementation will be much less pronounced because of all the parasitic resistances and capacitances that limit the peak value of this current. Additionally, it can be verified that the snubber resistor dissipates an approximately constant power of $3.2 W$. This reflects the leakage inductance value, which is very high, and could be decreased by replacing the hand-winded tranformer with a properly manufactured one.

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Sim snubber.png" alt="" style="width:80%;max-height=30rem;">
   Simulation of the currents in the snubber.
</p>


# Transformer measurements

Once the transformer was wound, it was measured using the laboratory's LCR meter. To verify the inductance of the primary and secondary winding, the opposite winding is left as an open-circuit while the secondary is short-circuited to measure the leakage inductance of the primary. In the following Figure you can see a photograph of the measurement of the secondary winding; the measured value corresponds approximately to the calculated theoretical value of the inductance $L_2$, as seen in the design results table.

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Medidor de Impedancias.jpeg" alt="" style="max-width:40%;max-height=30rem;">
</p>

Additionally, the relationship $N_1/N_2$ was verified by applying a sinusoidal signal with a functino generator to one of the windings, and measuring the output signal in the other winding with an oscilloscope.


# Circuit Measurements

The measurements were made using an autotransformer (Variac) galvanically isolated from the line voltage to protect the oscilloscope. The load connected for the measurements was such that the output power is approximately $20W$, when changing the load to obtain a power of $30W$, analogous results were observed. The voltage of the autotransformer was gradually increased until reaching the final value of $220V$ for each measurement made. In the following Figure a photograph can be seen of the circuits power connections.


<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Foto Variac.jpeg" alt="" style="max-width:40%;max-height=30rem;">
</p>


The following Figure shows the output voltage, it has an average value of $12V$ thanks to the calibration carried out through the variable resistor and the control carried out by the TinySwitch-4. The voltage presents a higher ripple than expected, of approximately $1.8 V$. This phenomenon is attributed to the peak recovery current of the output diode, as well as in part to the ESR of the output capacitor.

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Medicion Vo.jpeg" alt="" style="width:80%;max-height=30rem;">
   Output voltage measurements.
</p>

The following Figures show the voltage over the Drain of the MOSFET:

<p style="text-align:center">
   <img src="/images/fuente-flyback-images/Medicion Vsw full.jpg" alt="" style="width:45%;max-height=30rem;display:inline-block;margin:1%;">
   <img src="/images/fuente-flyback-images/Medicion Vsw zoom.jpg" alt="" style="width:45%;max-height=30rem;display:inline-block;margin:1%;">
</p>

These images show the voltage peak at the moment of shutdown that is attenuated by the snubber circuit, always staying below $600V$. However, it is noted that the resonances present in the simulation have a lower amplitude on the circuit measurements, since these are attenuated by the losses present on the board and the real components. Additionally, it can be seen that the dynamic current limit established by the TinySwitch-4 is such that in certain cycles the system operates in discontinuous mode while in others it operates in continuous mode. This phenomenon is evidenced in the appearance of oscillations during the shutdown time, due to the fact that when the secondary current reaches zero, a recovery current appears in the output diode that excites the resonating circuit formed between the magnetizing inductance of the transformer and the capacitances of the MOSFET. When modifying the load, it was observed that the percentage of cycles in DCM decreases as the load increases, reaching almost all the cycles in CCM for $P_o=30W$.


[^1]: <a href="https://www.power.com/sites/default/files/documents/tinyswitch-4_family_datasheet.pdf" style="word-wrap:break-word;">https://www.power.com/sites/default/files/documents/tinyswitch-4_family_datasheet.pdf</a>

[^2]: <a href="https://cdn.hackaday.io/files/1709627314438208/AN%204147.pdf" style="word-wrap:break-word;">https://cdn.hackaday.io/files/1709627314438208/AN%204147.pdf</a>
