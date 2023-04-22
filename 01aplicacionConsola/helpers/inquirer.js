import inquirer from 'inquirer'
import colors from 'colors'

//Creo la constante preguntas (el arreglo de questions que me pide el inquirer) fuera del inquirerMenu
const preguntas= [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1', //es importante pasar el número como string porque así se lee de consola
                name: `${'1'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.green} Completar tareas`
            },
            {
                value: '6',
                name: `${'6'.green} Borrar tareas`             },
            {
                value: '0',
                name: `${'0'.green} Salir`
            },
        ]
    }
]; 


export const inquirerMenu = async()=>{

    console.clear()
    console.log("================================".green)
    console.log("     Seleccione una opción   ".white)
    console.log("================================\n".green)

    //como inquirer trabaja en base a promesas puedo usar el await
    
    //puedo desestructurar la opcion del resultado de la promesa
    const {opcion}= await inquirer.prompt(preguntas)

    return opcion
}


export const pausaAction = async()=>{
    
//siempre es un arreglo lo que va en el inquirer.prompt
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

export const leerInput = async (message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: message,
            validate(value){       //validate es una función que tiene el value que se acaba de escribir
                if(value.length === 0){   //hago la validación  de que el value no esté vacio
                    return 'Por favor, ingrese un valor'  
                }
                return true
            }

        }
    ]

    const {desc} = await inquirer.prompt(question)
    return desc
}

export const listadoTareasBorrar =async (tareas) =>{

    const choices = tareas.map((tarea, indice)=>{
        
        const idx = `${indice + 1 }`.green 
        
        //map lo que tiene es que todos los hijos van a tener lo que yo ponga en el return
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })

    //unshift añade al principio del array
    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas)

    return id
}

export const confirmar = async (message)=>{
    const pregunta =[
        {
            type: 'confirm', //regresa un valor boolean
            name: 'ok',
            message: message
        }
    ]

    const {ok} = await inquirer.prompt(pregunta)
    return ok

}

export const mostrarListadoChecklist =async (tareas) =>{

    const choices = tareas.map((tarea, indice)=>{
        
        const idx = `${indice + 1 }`.green 
        
        
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn ) ? true : false
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas)

    return ids
 }