import { Tarea } from "./tarea.js"

export class Tareas{
    
    _listado = {} 
                                              
    constructor(){
        this._listado = {}
    }

   crearTarea(desc=""){

    const tarea = new Tarea(desc)
    
    //_listado es un objeto, no un arreglo. Computo el uid como propiedad y le paso la tarea

    this._listado[tarea.id] = tarea

   }
                                            
}