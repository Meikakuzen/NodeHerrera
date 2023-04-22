import colors from 'colors'
import { inquirerMenu, leerInput, pausaAction, listadoTareasBorrar, confirmar, mostrarListadoChecklist } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';
import { guardarDB, leerDB } from './helpers/guardarArchivo.js';

console.clear();

const main =async()=>{

    let opt = ""
    const tareas = new Tareas

    //guardo lo que leo en la DB
    const tareasDB = leerDB()

    if(tareasDB){  // si hay tareas lo formateo con cargarTareas al objeto ._listado
      tareas.cargarTareasFromArray(tareasDB)
    }

  do {
    
     opt = await inquirerMenu();

     switch(opt){
      case '1':
        const desc = await leerInput('Descripción: ')
        tareas.crearTarea(desc)

      break;
      case '2':
        tareas.listadoCompleto()
      break;
      
      case'3':
      tareas.listarPendientesCompletadas()
      break;

      case '4':
        tareas.listarPendientesCompletadas(false)
        break;

      case '5':  //completar tareas
        const ids = await mostrarListadoChecklist(tareas.listadoArr)
        tareas.toggleCompletadas(ids)
        break;

      case '6':

        const id = await listadoTareasBorrar(tareas.listadoArr) //importante el await para que espere al resultado!
        if(id !== '0'){
          
          const ok = await confirmar("Está seguro?")
          
          if(ok){
            tareas.borrarTarea(id)
            console.log('Tarea borrada')
          }
        }
        break;
     }

    guardarDB(tareas.listadoArr) //lo guardo como un arreglo
    
    await pausaAction()

  } while (opt !== '0') 
    
}

main();