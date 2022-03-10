---
layout: post
title: ¿Cuál es la palabra más larga que se puede escribir dando vuelta una calculadora?
author: Matías Bergerman
---

Esta es la pregunta que planteó Tom Scott en los comentarios de [su video](https://youtu.be/zp4BMR88260) donde se pregunta cuál es la palabra más larga que puede escribir con displays de 7 segmentos, así que se me ocurrió que podía ser una buena idea intentar responder esta pregunta para el idioma español.

### Primero lo primero, ¿Qué es un display de 7 segmentos?

Los displays de 7 segmentos tienen 7 rayitas y un puntito decimal, los cuales pueden encenderse en forma independiente. Dependiendo de la combinación en la cual se enciendan pueden representar cualquier dígito del 0 al 9 pero también podrían mostrar algunas otras cosas, como por ejemplo las letras de la A hasta la F las cuales son muy últiles para representar números usando el [sistema hexadecimal](https://es.wikipedia.org/wiki/Sistema_hexadecimal).

<p style="text-align:center">
<img src="images/siete-segmentos/7seg-digits.png" alt="Dígitos del 0 al 9 en displays de 7 segmentos" style="max-height: 8em;">
</p>


### Escribiendo palabras

Cuando era muy chico, me acuerdo que usaba una calculadora en la escuela con displays de 7 segmentos, hasta que por fin conseguí una calculadora científica. Una vez me mostraron un juego en el cual me contaban una historia con números que se iban sumando y multiplicando hasta llegar a un resultado, pero al dar vuelta la calculadora el resultado se convertía en una palabra, que era justamente el desenlace de la historia! No recuerdo los detalles, pero si me acuerdo que había un objeto escondido el cual se encontraba en un:

<p style="text-align:center">
<img src="images/siete-segmentos/7seg-bolsillo.png" alt="Palabra BOLSILLO en un display de calculadora al derecho" style="max-height: 8em;">
</p>

Un momento, eso no es un número... Hmm puede que haya habido una coma después del 0? No importa, lo importante es que cuando damos vuelta la pantalla de la calculadora los dígitos 07715708 se convierten en:

<p style="text-align:center">
<img src="images/siete-segmentos/7seg-bolsillo.png" alt="Palabra BOLSILLO en un display de calculadora al revés" style="max-height: 8em;transform: scaleX(-1) scaleY(-1);">
</p>

¡A-ha! El objeto estaba en el BOLSILLO (ponele... hay que tener un poco de imaginación pero si le ponemos onda parece que dice eso).

Y ahora la pregunta del millón... ¿Hay alguna palabra más larga que "bolsillo" que se pueda escribir de esta forma? Y si la respuesta es sí, ¿Cuál es la más larga posible?


### Todas las palabras

Estuve buscando un rato alguna lista con todas (o casi todas) las palabras del idioma español. Tom Scott muestra en su video dónde conseguir una lista con las palabras en inglés, por lo cual quería encontrar algo parecido.

En [este repositorio](https://github.com/lorenbrichter/Words/) encontré una lista que al parecer obtuvieron de un juego que usa palabras ¡Esta lista tiene 636598 palabras diferentes! Tiene algunas palabras bastante raras, y ni siquiera tiene tildes. Pero bueno, por ahora no nos molesta.

### Hora de programar

El paso siguiente es empezar a armar un programa para encontrar la palabra que estamos buscando. Yo elegí usar Python, para lo cual empecé por abrir el archivo y definir una lista cuyos elementos sean cada una de las palabras:

```python
archivo = open('es.txt', 'r')
lista_palabras = archivo.readlines()
```

En este momento, cada elemento de la lista es un `string` con una palabra de la lista. Sin embargo también tienen un caracter de más, al final de cada palabra aparece un `\n` que corresponde con una nueva línea. Podemos eliminarlo al recorrer el listado y ejecutar la instrucción `strip()`:

```python
archivo = open('es.txt', 'r')
lista_palabras = archivo.readlines()

for palabra in lista_palabras:
    palabra = palabra.strip('\n')
```

No todas las letras se pueden representar en un display de 7 segmentos. Con los dígitos del 0 al 9 las letras que se pueden mostrar son:

| Dígito | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|:------:|:-:|:-:|:-:|:-:|:-:|:-:|---|---|---|---|
|  Letra | o | i |   | E | h | S |   | L | B | G |

Para mí, el 9 es el que más se parece a una G. Además el 4 se parece a una h minúscula, y el 2 y 6 no se parecen a nada. ¿No estás de acuerdo conmigo? Hace tu propio programa!

Cualquier palabra "válida" solamente puede contener estas letras especiales. Para chequear esta condición, se me ocurrió usar `set`. Empiezo definiendo un `set` de letras válidas:

```python
letras_validas = {'o', 'i', 'e', 'h', 's', 'l', 'b', 'g'}
```

Luego, para revisar si una palabra en particular está compuesta exclusivamente por estas letras, puedo convertir el `string` de la palabra en un `set`, de esta forma eliminando repeticiones y desestimando el orden en el cual aparecen las letras. A continuación simplemente pregunto si este `set` es un sub-conjunto de `letras_validas`:

```python
letras_validas = {'o', 'i', 'e', 'h', 's', 'l', 'b', 'g'}

for palabra in lista_palabras:
    if set(palabra).issubset(letras_validas):
        # La palabra es válida
```

Por último, para llevar la cuenta de cuál es la palabra más larga declaro dos variables para guardar el resultado más largo hasta ahora. El programa completo resulta:

```python
archivo = open('es.txt', 'r')
lista_palabras = archivo.readlines()

letras_validas = {'o', 'i', 'e', 'h', 's', 'l', 'b', 'g'}

maxima_longitud = 0
palabra_mas_larga = ''

for palabra in lista_palabras:
    palabra = palabra.strip('\n')
    if len(palabra) > maxima_longitud:
        if set(palabra).issubset(letras_validas):
            palabra_mas_larga = palabra
            maxima_longitud = len(palabra)

print(palabra_mas_larga)
```

Y el resultado es...
```
> bisbiseeis
```

Hmm, raro... A ver, vamos a ver si hay alguna otra palabra de la misma longitud:

```python
for palabra in lista_palabras:
    palabra = palabra.strip('\n')
    if len(palabra) == 10:
        if set(palabra).issubset(letras_validas):
            print(palabra)
```

```
> bisbiseeis
> eligieseis
```

Bueno... vamos a ignorar el primer resultado porque no me gustó jeje. Ahora sí, empatada en el primer puesto, la gran ganadora del premio a la palabra más larga, representada por el número 5135319173, es:

<p style="text-align:center">
<img src="images/siete-segmentos/7seg-eligieseis.png" alt="Palabra ELIGIESEIS en un display de calculadora al revés" style="max-height: 8em;transform: scaleX(-1) scaleY(-1);">
</p>

Después de ver esto me dió curiosidad a ver cómo es el ranking de las palabras más largas, así que para eso en lugar de guardar solamente la más larga quiero ir agregando toda palabra válida en una gran lista. Al final, simplemente puedo ordenar la lista para ver cuáles son las palabras válidas más largas:

```python
palabras_validas = []

for palabra in lista_palabras:
    palabra = palabra.strip('\n')
    if set(palabra).issubset(letras_validas):
        palabras_validas.append(palabra)

palabras_validas.sort( key=len, reverse=True )

for palabra in palabras_validas:
    print(palabra)
```
```
> bisbiseeis
> eligieseis
> bebieseis
> beisboles
> bisbisees
> bisbiseis
> bisbiseos
> bolsillos
> elegibles
> eligieses
> elogiosos
> goloseeis
> hebilleis
> hioglosos
> ilegibles
> legisleis
> seisillos
> sigilosos
> solieseis
> ...
```

Hay 2 palabras con 10 letras, 17 con 9 letras, y bueno muchas más después de eso. Por suerte en esta lista sí hay varias palabras que reconozco así que me quedo más contento, por lo cual doy por finalizado el experimento :)