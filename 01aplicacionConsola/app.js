import colors from 'colors'
import { inquirerMenu, pausaAction } from './helpers/inquirer.js';
import { Tarea } from './models/tarea.js';
import { Tareas } from './models/tareas.js';

console.clear();

const main =async()=>{

    let opt = ""
  do {
    

    //opt = await inquirerMenu();
    
    const tareas= new Tareas()

    const tarea = new Tarea('Tarea a realizar')

    tareas._listado[tarea.id] = tarea; // computo el id y le paso la tarea

    console.log(tareas)
    
    await pausaAction()

  } while (opt !== '0') 
    
}

main();