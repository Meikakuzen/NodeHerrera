import colors from 'colors'
import { inquirerMenu, leerInput, pausaAction } from './helpers/inquirer.js';
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
        guardarDB(tareas.listadoArr) //lo guardo como un arreglo

      break;
      case '2':
        tareas.listadoCompleto()
      break;
      
      case'3':
      console.log(tareas.listarPendientesCompletadas())
      break;

      case '4':
        tareas.listarPendientesCompletadas(false)
        break;
     }

    
    
    await pausaAction()

  } while (opt !== '0') 
    
}

main();