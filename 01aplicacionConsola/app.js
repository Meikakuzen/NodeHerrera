import colors from 'colors'
import { inquirerMenu, leerInput, pausaAction } from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';

console.clear();

const main =async()=>{

    let opt = ""
    const tareas = new Tareas

  do {
    
     opt = await inquirerMenu();

     switch(opt){
      case '1':
        const desc = await leerInput('Descripción: ')
        tareas.crearTarea(desc)

      break;
      case '2':
        console.log( tareas._listado) // aunque en principio _listado es privada lo pongo así de momento (fast way)
      break;
     }
    
    
    await pausaAction()

  } while (opt !== '0') 
    
}

main();