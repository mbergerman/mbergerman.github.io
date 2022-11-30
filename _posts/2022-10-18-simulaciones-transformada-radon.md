---
layout: post
title: Simulaciones de la transformada de Radón - Cómo funciona una tomografía
author: Matías Bergerman
lang: es
lang-ref: tomografia
---

<script src="assets/files/tomografia-files/tomography.js"></script>

# Transformada de Radón

La transformada de Radón es una de las herramientas matemáticas que permiten imágenes tomográfica de un objeto o ser vivo. Las imágenes tomográficas consisten en múltiples secciones bidimensionales que se obtienen a partir de un elemento tridimensional. El inconveniente de esto, es que la mayoría de los instrumentos que permiten "mirar" a través de objetos opacos no disciernen en forma evidente la profundidad, espesor o material de los elementos que observa. Por ejemplo, las radiografías por rayos X emiten un haz que atraviesa al objeto, se atenúa a medida que se encuentra con el material del mismo, y finalmente la intensidad de la luz que emerge luego de atravesarlo es detectada. Se puede interpretar esta medición como la integral del objeto a lo largo del eje paralelo a los rayos emitidos por el instrumento.

En función de esto es que surge la necesidad de reconstruír la imagen del objeto original a partir de la proyección del mismo, que se obtuvo mediante el uso de un instrumento de medición. La transformada de Radón representa la proyección obtenida, y se puede describir como la integral de una función sobre un conjunto de rectas. Para visualizar intuitivamente la transformada, a continuación se presenta una serie de simulaciones representando en forma muy simplificada el proceso de una tomografía.

Un elemento medidor rota al rededor de un objeto realizando la integral del mismo a lo largo del eje de medición. Esta integral se grafica a la derecha, donde el eje vertical corresponde con el ángulo de rotación del instrumento de medición.

### (Hacer click en la ventana de simulación para iniciarla)
<div id="sketch-tomography" style="max-width:800px;"></div>
Simulación de la tomografía de una cabeza y su transformada de Radón.

A modo de ejemplo, para poder comprender esta simulación en una forma más intuitiva, a continuación se muestra la transformada de dos círculos con diferente opacidad. La transformada corresponde con dos curvas senoidales de cierto ancho y con diferente intensidad entre sí.

### (Hacer click en la ventana de simulación para iniciarla)
<div id="sketch-tomography-dots" style="max-width:800px;"></div>

A continuación a modo de prueba, se realiza la transformada del logo del ITBA. Como se puede ver, es indistinto realizar la transformada rotando el instrumendo de medición o el objeto medido.

### (Hacer click en la ventana de simulación para iniciarla)
<div id="sketch-tomography-logo" style="max-width:800px;"></div>

### (Hacer click en la ventana de simulación para iniciarla)
<div id="sketch-tomography-logo2" style="max-width:800px;"></div>


Las simulaciones fueron basadas en el video [Looking through Objects - How Tomography Works!](https://youtu.be/f0sxjhGHRPo) por [Kolibril](https://www.youtube.com/@Kolibril).

Para poder reconstruír la imagen original, se debe aplicar el proceso inverso utilizando un filtrado pasa-altos. En el video previamente mencionado se puede observar una explicación detallada de este proceso, como también el desarrollo matemático de la transformada de Radón.