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
