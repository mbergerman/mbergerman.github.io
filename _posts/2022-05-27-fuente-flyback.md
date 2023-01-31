---
layout: post
title: Diseño de una fuente de alimentación Flyback
author: Matías Bergerman, Franco Moriconi, Carola Pedrosa, Franco Scapolla
lang: es
lang-ref: fuente-flyback
---

# Diseño de la fuente Flyback

El objetivo de este trabajo es diseñar una fuente Flyback con una entrada de $220\ V_{AC_{RMS}}$ y una salida de $12\ V_{DC}$. Esta emplea un circuito de realimentación con un optoacoplador y el circuito integrado TNY290PG[^1]. De acuerdo a las características de este IC se optó por designar una potencia de salida objetivo de $30W$.


<p style="text-align:center">
    <img src="images/fuente-flyback-images/foto_flyback_1.jpg" alt="" style="max-width:45%;max-height=30rem;display:inline-block;margin:1%;">
    <img src="images/fuente-flyback-images/foto_flyback_2.jpg" alt="" style="max-width:45%;max-height=30rem;display:inline-block;margin:1%;">
</p>

Para empezar, se partió del circuito de aplicación típica provisto por el fabricante, el cual se puede observar a continuación:
<p style="text-align:center">
   <img src="images/fuente-flyback-images/TNY Flyback.svg" alt="" style="background-color:white;width:50%;max-height=30rem;">
   Circuito de aplicación típica provisto por el fabricante.
</p>

Sobre este circuito, se agrega un rectificador de tensión de línea a la entrada, una resistencia para la detección del *under-voltage* entre la línea y el pin EN/UV del TNY290PG, y una resistencia variable en serie con el LED del optoacoplador para permitir un ajuste fino de la tensión de salida. Adicionalmente, se añade una resistencia en serie con el primario del transformador para realizar mediciones de corriente como también diversos puntos de medición de tensión. El capacitor de BP se selecciona de acuerdo a la limitación de corriente deseada, y el circuito *snubber* se diseña de acuerdo a la nota de aplicación AN4147[^2] de Fairchild Semiconductors. La única modificación que se realiza sobre la misma es la adición de una resistencia de 100 ohms en serie con el diodo del snubber con el fin de amortiguar la resonancia del circuito entre el capacitor del snubber y las inductancias del transformador en el momento de la conmutación. El circuito final se puede ver a continuación:


<p style="text-align:center">
   <img src="images/fuente-flyback-images/Main_Sch.png" alt="" style="background-color:white;width:90%;max-height=30rem;">
   Circuito diseñado.
</p>

Para la implementación del circuito en un PCB se siguieron las indicaciones dadas por el fabricante del integrado TinySwitch:

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Recomendaciones PCB.png" alt="" style="background-color:white;width:80%;max-height=30rem;">
   Recomendaciones de diseño del fabricante.
</p>

Una imagen del PCB diseñado se puede ver a continuación:

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Main_PCB.png" alt="" style="background-color:white;width:80%;max-height=30rem;">
</p>
<p style="text-align:center">
   <img src="images/fuente-flyback-images/Main_PCB_3d.png" alt="" style="background-color:white;width:80%;max-height=30rem;">
</p>

Los principales parámetros de diseño se pueden observar en la Tabla que se ve a continuación. Algunos de estos parámetros debieron ser modificados en forma leve para adecuarse a la disponibilidad de componentes.

<div class="scrollbox">
<table>
    <tr>
        <td><b>Parámetro</b></td>
        <td><b>Valor</b></td>
        <td><b>Unidad</b></td>
    </tr>
    <tr>
        <td>Potencia de Salida ($P_o$)</td>
        <td>30</td>
        <td>W</td>
    </tr>
    <tr>
        <td>Tensión de Salida ($V_o$)</td>
        <td>12</td>
        <td>V</td>
    </tr>
    <tr>
        <td>Tensión de Entrada ($V_i$)</td>
        <td>311</td>
        <td>V</td>
    </tr>
    <tr>
        <td>Duty-Cycle típico</td>
        <td>0,4</td>
        <td></td>
    </tr>
    <tr>
        <td>Frecuencia de switching ($f_s$)</td>
        <td>132</td>
        <td>kHz</td>
    </tr>
    <tr>
        <td>Inductancia del primario ($L_1$)</td>
        <td>5</td>
        <td>mHy</td>
    </tr>
    <tr>
        <td>$I_{LIMIT}$ del TinySwitch-4</td>
        <td>0,75</td>
        <td>A</td>
    </tr>
    <tr>
        <td>$A_L$ del núcleo</td>
        <td>5200</td>
        <td>nHy/N²</td>
    </tr>
    <tr>
        <td>Densidad de Corriente ($J$)</td>
        <td>3</td>
        <td>A/mm²</td>
    </tr>
    <tr>
        <td>Area efectiva del primario</td>
        <td>76,8</td>
        <td>mm²</td>
    </tr>
    <tr>
        <td>Area efectiva del secundario</td>
        <td>76,8</td>
        <td>mm²</td>
    </tr>
    <tr>
        <td>$B_{sat}$</td>
        <td>200</td>
        <td>mT</td>
    </tr>
    <tr>
        <td>Area mínima del núcleo</td>
        <td>229</td>
        <td>mm²</td>
    </tr>
    <tr>
        <td>Radio del cable disponible ($r_2$)</td>
        <td>0,3</td>
        <td>mm</td>
    </tr>
    <tr>
        <td>Ripple de tensión de salida</td>
        <td>1</td>
        <td>%</td>
    </tr>
    <tr>
        <td>Tensión de ruptura de la llave</td>
        <td>725</td>
        <td>V</td>
    </tr>
    <tr>
        <td>Inductancia de dispersión medida</td>
        <td>177,3</td>
        <td>uHy</td>
    </tr>
    <tr>
        <td>Ripple de tensión del $C_{SN}$</td>
        <td>7,3</td>
        <td>%</td>
    </tr>
</table>
</div>

A partir de los parámetros de diseño se calcularon el resto de los parámetros necesarios para realizar una implementación del circuito. Los resultados y los componentes seleccionados para adecuarse a estos se pueden ver en las siguientes Tablas:


<div class="scrollbox">
<table>
    <tr>
        <td><b>Componente</b></td>
        <td><b>Valor</b></td>
    </tr>
    <tr>
        <td>Diodo de salida</td>
        <td>MUR460</td>
    </tr>
    <tr>
        <td>Capacitor de salida</td>
        <td>47uF</td>
    </tr>
    <tr>
        <td>Capacitor de BP</td>
        <td>1uF</td>
    </tr>
    <tr>
        <td>Puente de diodos</td>
        <td>W10M</td>
    </tr>
    <tr>
        <td>Capacitor de entrada</td>
        <td>47uF</td>
    </tr>
    <tr>
        <td>Optoacoplador</td>
        <td>4N25</td>
    </tr>
    <tr>
        <td>Zenner</td>
        <td>10V</td>
    </tr>
    <tr>
        <td>Resistencia variable</td>
        <td>20 kOhm</td>
    </tr>
    <tr>
        <td>$R_{SN}$</td>
        <td>22 kOhm</td>
    </tr>
    <tr>
        <td>Potencia $R_{SN}$</td>
        <td>5 W</td>
    </tr>
    <tr>
        <td>$C_{SN}$</td>
        <td>4,7 nF</td>
    </tr>
    <tr>
        <td>Diodo del snubber</td>
        <td>FR107</td>
    </tr>
</table>
</div>
<br>
<div class="scrollbox">
<table>
    <tr>
        <td><b>Parámetro</b></td>
        <td><b>Ecuación</b></td>
        <td><b>Valor</b></td>
        <td><b>Unidad</b></td>
    </tr>
    <tr>
        <td>Corriente de salida promedio</td>
        <td>$P_o/V_o$</td>
        <td>2,5</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Relación de vueltas del Transformador ($N_1/N_2$)</td>
        <td>$1/\left(\frac{V_o}{V_i}\cdot\frac{(1-D)}{D}\right)$</td>
        <td>17,2778</td>
        <td></td>
    </tr>
    <tr>
        <td>Corriente de salida media durante el apagado ($I_{X_2}$)</td>
        <td>$I_{o_{avg}}/(1-D)$</td>
        <td>4,1667</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Corriente de entrada media durante el encendido ($I_{X_1}$)</td>
        <td>$I_{X_2}\cdot\frac{N_2}{N_1}$</td>
        <td>241,2</td>
        <td>mA</td>
    </tr>
    <tr>
        <td>Corriente de entrada promedio ($I_{i_{avg}}$)</td>
        <td>$I_{X_1}\cdot D$</td>
        <td>96,5</td>
        <td>mA</td>
    </tr>
    <tr>
        <td>Potencia de entrada</td>
        <td>$V_o\cdot I_{i_{avg}}$</td>
        <td>30</td>
        <td>W</td>
    </tr>
    <tr>
        <td>Corriente de entrada pico ($\hat{I_i}$)</td>
        <td>$I_{X_1}+(D\cdot T_s/2\cdot V_i/L_1)$</td>
        <td>335,4</td>
        <td>mA</td>
    </tr>
    <tr>
        <td>Cantidad de vueltas del primario ($N_1$)</td>
        <td>$\sqrt{L_1/A_L}$</td>
        <td>31</td>
        <td></td>
    </tr>
    <tr>
        <td>Cantidad de vueltas del secundario ($N_2$)</td>
        <td>$N_1 / \frac{N_1}{N_2}$</td>
        <td>1,8</td>
        <td></td>
    </tr>
    <tr>
        <td>Profundidad de skin ($d$)</td>
        <td>$66/\sqrt{f_s}$</td>
        <td>0,1817</td>
        <td>mm</td>
    </tr>
    <tr>
        <td>Radio mínimo del cable del primario ($r_1$)</td>
        <td>$\frac{I_{i_{avg}}/J+d^2\cdot\pi}{2\cdot d\cdot\pi}$</td>
        <td>0,1190</td>
        <td>mm</td>
    </tr>
    <tr>
        <td>Inductancia del secundario ($L_2$)</td>
        <td>$\frac{N_1/N_2}{ {L_1}^2 }$</td>
        <td>16,7</td>
        <td>uHy</td>
    </tr>
    <tr>
        <td>Corriente del secundario pico ($\hat{I_2}$)</td>
        <td>$\hat{I_i}\cdot \frac{N_1}{N_2}$</td>
        <td>5,79</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Corriente del secundario mínima ($I_{2_{min}}$)</td>
        <td>$2\cdot I_{X_2} - \hat{I_2}$</td>
        <td>2,54</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Corriente de salida RMS ($I_{o_{RMS}}$)</td>
        <td>$\sqrt{(1-D)/3\cdot(\hat{I_2}^2+\hat{I_2}\cdot I_{2_{min}} + {I_{2_{min}}}^2)}$</td>
        <td>3,31</td>
        <td>A</td>
    </tr>
    <tr>
        <td>Cantidad mínima de cables del secundario</td>
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

# Simulación del circuito
Debido a la falta de un modelo de SPICE apropiado para simular el comportamiento del TinySwitch-4, las simulaciones del circuito debieron ser realizadas sin tomar en cuenta el circuito de realimentación. La conmutación se realizó con una llave ideal controlada mediante PWM de duty-cycle constante. Se realizaron las simulaciones tanto con un valor de inductancia de dispersión en el transformador igual a 0 (caso ideal), como con un valor del $0,178 mH$, que se corresponde al medido en el transformador construido; de esta forma se pueden comparar ambos casos y verificar los efectos de la inductancia de dispersión.

El coeficiente de acoplamiento $K$ necesario para realizar la simulación puede encontrarse mediante la siguiente ecuación:

$$L_d=L\cdot(1-K^2)$$

De esta forma se encuentra que el valor de $K$ es $1$ para el caso ideal y $0,982$ en el caso del transformador real.

El circuito empleado se puede ver a continuación. La salida es conectada a GND para que la simulación pueda ser calculada empleando métodos numéricos.

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Circuito Spice.png" alt="" style="width:80%;max-height=30rem;">
   Circuito simulado.
</p>

En la Figura siguiente se observan las corrientes del transformador. En el caso real, se puede notar una oscilación en el perodo de apagado de la llave producida por las resonancias con el circuito snubber. En el período de encendido, se observa una oscilación de mayor frecuencia que se debe en este caso a resonancia con la capacitancia parásita del diodo de salida. Al reemplazar el diodo de salida por uno ideal, las oscilaciones de mayor frecuencia desaparecen.

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Transformer currents.png" alt="" style="width:80%;max-height=30rem;">
   Simulación de la corriente del transformador.
</p>

En las Figuras siguientes se observa la tensión de salida, la cual se establece en un valor inferior a $12 V$ en ambos casos. Para el transformador ideal, la diferencia con la tensión objetivo se debe a la caída de tensión del diodo de salida, mientras que en el caso real aparecen mayores pérdidas debido a la inductancia de dispersión y las pérdidas en el circuito snubber. De acuerdo al diseño del circuito esto se logrará compensar mediante el lazo de realimentación, aumentando el duty-cycle efectivo y estableciendo $12 V$ en la salida. Por otro lado, se nota un sobrepico de aproximadamente $15 V$ al inicio el cual también debe ser compensado mediante el control realizado por la TinySwitch-4.

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Sim Vo full.png" alt="" style="width:80%;max-height=30rem;">
   Simulación de la tensión de salida.
</p>

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Sim Vo zoom.png" alt="" style="width:80%;max-height=30rem;">
   Simulación de la tensión de salida.
</p>

En las Figuras siguientes se observa la tensión sobre el switch, la cual de acuerdo a las limitaciones del TNY290PG no debe superar nunca los $725 V$. En ambos casos el valor de tensión en estado estacionario coincide con los resultados expuestos en la sección anterior, estando estos por debajo del límite mencionado. Sin embargo, aparece un sobrepico en el inicio que tiene el potencial de quemar al circuito integrado. Esto no debiera ser un problema en la implementación real ya que, como se comentó, el control que realiza la TinySwitch-4 sobre la tensión de salida previene la aparición de tan alta tensión a la entrada.

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Sim Vsw full.png" alt="" style="width:80%;max-height=30rem;">
   Simulación de la tensión del switch.
</p>

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Sim Vsw zoom.png" alt="" style="width:80%;max-height=30rem;">
   Simulación de la tensión del switch.
</p>

En la Figura siguiente se observan las corrientes presentes en el snubber. En ella se nota el pico de corriente inicial provocado por la inductancia de dispersión. A continuación, se observan las mismas oscilaciones que en la corriente del primario debido a la resonancia entre estos elementos. Finalmente, se observa un pico negativo muy pronunciado que se debe a la corriente de recuperación del diodo propio del circuito del snubber, el cual en la implementación real será más leve ya que no se están tomando en cuenta todas las resistencias y capacitancias parásitas que limitarán el valor pico de esta corriente. Adicionalmente, se puede comprobar que la resistencia del snubber disipa una potencia aproximadamente constante de $3,2 W$.

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Sim snubber.png" alt="" style="width:80%;max-height=30rem;">
   Simulación de las corrientes en el snubber.
</p>


# Mediciones del transformador

El transformador una vez bobinado fue medido usando el analizador de impedancias del laboratorio. Para verificar la inductancia del devanado primario y secundario se deja abierto el devanado opuesto mientras que para medir la inductancia de dispersión del primario se cortocircuitó el secundario. En la Figura siguiente se puede ver una fotografía de la medición del bobinado secundario; el valor medido se corresponde aproximadamente con el valor teórico calculado de la inductancia $L_2$, tal como se ve en la tabla de resultados del diseño.

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Medidor de Impedancias.jpeg" alt="" style="max-width:40%;max-height=30rem;">
</p>

Adicionalmente se verificó la relación $N_1/N_2$ aplicando una señal senoidal con el generador de señales a uno de los devanados, y midiendo la señal de salida en el otro devanado con un osciloscopio.


# Mediciones del circuito

Las mediciones se realizaron utilizando un autotransformador (Variac) aislado galvánicamente de la tensión de línea para proteger al osciloscopio. La carga conectada para las mediciones fue tal que la potencia de salida es aproximadamente $20W$, al cambiar la carga para obtener una potencia de $30W$ se observaron resultados análogos. Se aumentó gradualmente la tensión del autotransformador hasta alcanzar el valor final de $220V$ para cada medición realizada. En la Figura siguiente se puede ver una fotografía de la alimentación del circuito.


<p style="text-align:center">
   <img src="images/fuente-flyback-images/Foto Variac.jpeg" alt="" style="max-width:40%;max-height=30rem;">
</p>


En la Figura siguiente se muestra la tensión de salida, esta posee un valor promedio de $12V$ gracias a la calibración realizada mediante el resistor variable y el control efectuado por el TinySwitch-4. La tensión presenta un ripple mayor al esperado, de aproximadamente $1,8 V$. Se atribuye este fenómeno al pico de corriente de recuperación del diodo de salida, como también en parte a la ESR del capacitor de salida.

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Medicion Vo.jpeg" alt="" style="width:80%;max-height=30rem;">
   Medición de la tensión de salida.
</p>

En las Figuras siguientes se muestra la tensión sobre el Drain del MOSFET:

<p style="text-align:center">
   <img src="images/fuente-flyback-images/Medicion Vsw full.jpg" alt="" style="width:45%;max-height=30rem;display:inline-block;margin:1%;">
   <img src="images/fuente-flyback-images/Medicion Vsw zoom.jpg" alt="" style="width:45%;max-height=30rem;display:inline-block;margin:1%;">
</p>

En ellas se evidencia el pico de tensión en el momento del apagado que es mitigado por el snubber manteniéndose siempre por debajo de los $600V$. Sin embargo, se nota que las resonancias presentes en la simulación tienen una amplitud menor para las mediciones sobre el circuito, dado que estas son atenuadas por las pérdidas propias de la placa y los componentes reales. Adicionalmente, se puede ver que el límite de corriente dinámico que establece el TinySwitch-4 es tal que en ciertos ciclos el sistema opera en el modo discontinuo mientras que en otros opera en el modo continuo. Este fenómeno se evidencia en la aparición de oscilaciones durante el tiempo de apagado, debidas a que cuando la corriente del secundario llega a cero, aparece una corriente de recuperación en el diodo de salida que excita al circuito resonador formado entre la inductancia de magnetización del transformador y las capacitancias del MOSFET. Al modificar la carga se observó que el porcentaje de ciclos en DCM disminuye al aumentar la carga, llegando casi a una totalidad de ciclos en CCM para una $P_o=30W$.


[^1]: <a href="https://www.power.com/sites/default/files/documents/tinyswitch-4_family_datasheet.pdf" style="word-wrap:break-word;">https://www.power.com/sites/default/files/documents/tinyswitch-4_family_datasheet.pdf</a>

[^2]: <a href="https://cdn.hackaday.io/files/1709627314438208/AN%204147.pdf" style="word-wrap:break-word;">https://cdn.hackaday.io/files/1709627314438208/AN%204147.pdf</a>
