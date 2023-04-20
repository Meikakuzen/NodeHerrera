# 01 Aplicacion Consola NODEJS HERRERA

- Instalo colors 
- Creo app.js
- NOTA: por defecto Node no emplea async await ya que corre todo secuencialmente
- Para poder usar async await creo la función main()

~~~js
import colors from 'colors'


console.clear(); //para limpiar todo lo que haya en consola

const main =async()=>{

}

main();
~~~
------

## stdin-stdout-Readline

- Primero crearé el menú, luego será más interactivo ( y eficiente )
- Creo la carpeta /helpers/mensajes.js
- El .green es del paquete colors, para añadirle color. \n es un salto de linea
- mensajes.js

~~~js
import colors from 'colors'

//esto va a terminar siendo una promesa
export const mostrarMenu = ()=>{
    console.clear()
    console.log("================================".green)
    console.log("     Seleccione una opción   ".green)
    console.log("================================\n".green)
}
~~~

- La importo en app.js y la invoco dentro del main( )
- Sigo con el menú. Pongo el numero como un string en un template literal para poder aplicarle color

~~~js
import colors from 'colors'

//esto va a terminar siendo una promesa
export const mostrarMenu = ()=>{
    console.clear()
    console.log("================================".green)
    console.log("     Seleccione una opción   ".green)
    console.log("================================\n".green)

    console.log(`${'1.'.green} Crear una tarea`)
    console.log(`${'2.'.green} Listar tareas`)
    console.log(`${'3.'.green} Listar tareas completadas`)
    console.log(`${'4.'.green} Listar tareas pendientes`)
    console.log(`${'5.'.green} Completar tarea(s)`)
    console.log(`${'6.'.green} Borrar tarea`)
    console.log(`${'0.'.green} Salir\n`)
}
~~~

- Cómo recibir info del usuario
- Debo preparar la interfaz. Importo el paquete readline que ya existe en Node. Le indico el input y el output con createInterface
- El .question se usa cuando se necesita el stdout (mostrar la información al usuario con la pregunta)

~~~js
import colors from 'colors'
import readline from 'readline'

//esto va a terminar siendo una promesa
export const mostrarMenu = ()=>{
    console.clear()
    console.log("================================".green)
    console.log("     Seleccione una opción   ".green)
    console.log("================================\n".green)

    console.log(`${'1.'.green} Crear una tarea`)
    console.log(`${'2.'.green} Listar tareas`)
    console.log(`${'3.'.green} Listar tareas completadas`)
    console.log(`${'4.'.green} Listar tareas pendientes`)
    console.log(`${'5.'.green} Completar tarea(s)`)
    console.log(`${'6.'.green} Borrar tarea`)
    console.log(`${'0.'.green} Salir\n`)

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    //ejecuta un callback ( cuando la función termine )
    rl.question('Seleccione una opción ', (opt)=>{
        console.log({opt}) //me muestra la opción introducida en la consola

        rl.close() // hay que cerrar el readLine porque si no se va a quedar esperando
    })
}
~~~

- Para pausar la aplicación creo una función 
- mensaje.js

~~~js
import colors from 'colors'
import readline from 'readline'

//esto va a terminar siendo una promesa
export const mostrarMenu = ()=>{
    console.clear()
    console.log("================================".green)
    console.log("     Seleccione una opción   ".green)
    console.log("================================\n".green)

    console.log(`${'1.'.green} Crear una tarea`)
    console.log(`${'2.'.green} Listar tareas`)
    console.log(`${'3.'.green} Listar tareas completadas`)
    console.log(`${'4.'.green} Listar tareas pendientes`)
    console.log(`${'5.'.green} Completar tarea(s)`)
    console.log(`${'6.'.green} Borrar tarea`)
    console.log(`${'0.'.green} Salir\n`)

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    //ejecuta un callback ( cuando la función termine )
    rl.question('Seleccione una opción ', (opt)=>{
        
        rl.close()
    })    
}

    //creo una función de pause
   export const pause = ()=>{
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
                    //presionando cualquier cosa continuará
        rl.question(`\nPresion ${'ENTER'.green} para continuar\n`, ()=>{
            rl.close()
        })
    }
~~~

- La invoco en el main después de mostrarMenu
- De esta manera se comió el primer readline de seleccione una opción, porque hay dos instancias del readline y dos callbacks, al ser secuencial, está tomando solo el último. Por eso aparece directamente presione ENTER sin darme la opción a seleccionar
- Para solucionar esto, primero voy a tener que esperar a que la persona ingrese algo
- Voy a tener que repetir este ciclo de ingresar la opción hasta que esta sea 0 y salga
----

## Repetir el menú de forma infinita

- Usaré un do while en el main
- Tengo que esperar a recibir una respuesta de mostrarMenu para que el dowhile no sea un bucle infinito
- No puedo convertir mostrarMenu con async porque tendría que entrar en la funcion rl.question y resolverla con un return, pero eso no resolvería la promesa de mostrarMenu
- Creo un return de una nueva promesa. 
  - Uso solo el resolve, el reject no lo voy a usar. Si tengo un error lo manejaré en su momento 
  - Coloco dentro de la promesa el código
  - Le paso el resultado de la console ( el opt) al resolve
- Hago lo mismo con la función pause

~~~js
import colors from 'colors'
import readline from 'readline'

//esto va a terminar siendo una promesa
export const mostrarMenu = ()=>{


    return new Promise((resolve)=>{
        
            console.clear()
            console.log("================================".green)
            console.log("     Seleccione una opción   ".green)
            console.log("================================\n".green)
        
            console.log(`${'1.'.green} Crear una tarea`)
            console.log(`${'2.'.green} Listar tareas`)
            console.log(`${'3.'.green} Listar tareas completadas`)
            console.log(`${'4.'.green} Listar tareas pendientes`)
            console.log(`${'5.'.green} Completar tarea(s)`)
            console.log(`${'6.'.green} Borrar tarea`)
            console.log(`${'0.'.green} Salir\n`)
        
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            })
        
            //ejecuta un callback ( cuando la función termine )
            rl.question('Seleccione una opción ', (opt)=>{
                rl.close()
                resolve(opt) //aquí puedo mandarle el resolve de la promesa
            })    

    })
}

//creo una función de pause
   export const pause = ()=>{

    return new Promise(resolve=>{
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question(`\nPresion ${'ENTER'.green} para continuar\n`, ()=>{
            rl.close()
            resolve() //no me interesa devolver nada, porque no necesito nada de lo que la persona escriba
                    //Cuando tengamos el readline, ahí es donde se va a ejecutar esto
        })

    })
    
    }
~~~

- Ahora puedo hacer el await de mostrarMenu porque reseulve una promesa
- Guardo el resultado de la promesa en opt
- app.js

~~~js
import colors from 'colors'
import { mostrarMenu, pause } from './helpers/mensajes.js';

console.clear();

const main =async()=>{

    let opt = ""
  do {
    
    opt = await mostrarMenu();
    
    if(opt !=='0') await pause()

  } while (opt !== '0') //pongo 0 como string porque lo que devuelve la consola es un string
    
}

main();
~~~

- Evidentemente hay que validar que sean números, pero ya soy capaz de recibir la información que ingresa el usuario
- Me gustaría que con las teclas direccionales puediera seleccionar una de las opciones
  - Para ello tendría que saber en que índice me encuentro, colorear esa linea y las demás no
  - Si toco direccional arriba, tendría que releer el input, y moverme desde dónde me encuentre, si estoy en el 1 ir abajo al 0, etc
- **Hay muchos paquetes en Node**. Cuando tengas un problema, seguro hay un paquete en Node para ello
------

## Construir el menú interactivo - Inquirer

- Instalo inquirer con npm
- Trabaja en base a promesas
- Primero con inquirer.prompt se introduce el cuerpo, resuelve en un then con la respuesta y atrapo el error con un catch
- Con inquirer haty validaciones, tipos de datos, etc
- Creo un archivo en helpers llamado inquirer.js
- inquirer.js

~~~js
import inquirer from 'inquirer'
import colors from 'colors'

//Creo la constante preguntas (el arreglo de questions que me pide el inquirer) fuera del inquirerMenu
const preguntas= [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: ['1. Crear Lista', 'opt2', 'opt3']
    }
]; 


export const inquirerMenu = async()=>{

    console.clear()
    console.log("================================".green)
    console.log("     Seleccione una opción   ".green)
    console.log("================================\n".green)

    //como inquirer trabaja en base a promesas puedo usar el await
    //guardo el resultado de la promesa en opt y lo retorno como resultado
    const opt= await inquirer.prompt(preguntas)

    return opt
}
~~~

- app.js

~~~js
import colors from 'colors'
import { inquirerMenu } from './helpers/inquirer.js';

console.clear();

const main =async()=>{

    let opt = ""
  do {
    
    opt = await inquirerMenu();
    
    

  } while (opt !== '0') 
    
}

main();
~~~

- Ahora si marco la opción 1 si hago un console.log de opt me devuelve el string '1. Crear Lista'
- Yo puedo querer que me devuelva un valor
----

## Opciones del menú interactivo

- Puedo desestructurar la opción del resultado de la promesa
~~~js
import inquirer from 'inquirer'
import colors from 'colors'

//Creo la constante preguntas (el arreglo de questions que me pide el inquirer) fuera del inquirerMenu
const preguntas= [
    {
        type: 'list',
        name: 'opcion', //desestructuro opcion porque es lo que pongo en el name
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1', //es importante pasar el número como string porque así se lee de consola
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas '
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea(s)'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
]; 


export const inquirerMenu = async()=>{

    console.clear()
    console.log("================================".green)
    console.log("     Seleccione una opción   ".green)
    console.log("================================\n".green)

    //puedo desestructurar la opcion del resultado de la promesa
    const {opcion}= await inquirer.prompt(preguntas)

    return opcion
}
~~~

- Falta ponerle pausa
- Será de tipo input, no necesita opciones
- inquirer.js
- 
~~~js
export const pausaAction = async()=>{

    const question =[ 
        {
            type: 'input',
            name: 'pausa',
            message: `Pulsa ${'ENTER'.green} para continuar`
        }
    ]
    
    console.log('\n') //le añado un salto de linea para que no estñe tan pegado

    await inquirer.prompt(question)

}
~~~
----

## Lógica para el manejo de las tareas por hacer

- Creo la carpeta models/tarea.js
- Creo la clase Tarea
- Uso el paquete uuid para el id

~~~js
import {v4} from 'uuid'


export class Tarea{
    
    //inicializar así las variables no es necesario, pero hecho así se asemeja a otros lenguajes
    
    id=''
    desc=''
    completadoEn = null //si es null significa no completado pero si tiene algo es que está completado. Se puede manejar así

    //lo único que voy a pedir es la descripción de la tarea
    constructor(desc){
        this.desc = desc;
        this.id = v4()
        this.completadoEn = null //esto es redundante pero así queda más claro
    }
    
}
~~~

- Como ocupo manejar varias tareas creo otro archivo en models llamado tareas, con s
- tareas.js

~~~js
export class Tareas{
    
    //no quiero manejar listado como un arreglo, pero significaría que a cada rato voy a tener que estar buscando el índice
    //barriendo todo para saber en que posición está algún elemento. Entonces lo quiero manejar como un objeto
    _listado = {} // en realidad no hace falta definirlo aqui, se define en el constructor, pero lo hace más fácild e observar
    //lo que busco es manejarlo como un objeto {'uuid-2323-3434-4-687-8-6-5': Tarea{id:'12121212', desc: 'ndlwhdowidj', completadoEn: null}, otrouuid }
    constructor(){
        this._listado = {}
    }

    //aqui van los métodos para insertar, completar, etc                                            
}
~~~
- Compruebo que todo funcione
- Le añado la descripción en duro por el momento
- app.js

~~~js
import colors from 'colors'
import { inquirerMenu, pausaAction } from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';

console.clear();

const main =async()=>{

    let opt = ""
  do {
    

    //opt = await inquirerMenu();
    
    const tarea = new Tarea('Comprar comida'); //le añado la descripción en duro
    console.log(tarea)
    
    await pausaAction()

  } while (opt !== '0') 
    
}

main();
~~~

- Voy a tener algo así en el do del main

~~~js
const tareas= new Tareas()

const tarea = new Tarea('Tarea a realizar')

tareas._listado[tarea.id] = tarea; // computo el id y le paso la tarea

console.log(tareas)
~~~

- devuelve esto en consola
~~~js
Tareas {
  _listado: {
    '37af4f4c-d297-4d22-82f6-54c55839f940': Tarea {
      id: '37af4f4c-d297-4d22-82f6-54c55839f940',
      desc: 'Tarea a realizar',
      completadoEn: null
    }
  }
}
~~~

- Tareas es quien se va a encargar de insertar, completar, etc
--------

## Crear y Listar tareas
