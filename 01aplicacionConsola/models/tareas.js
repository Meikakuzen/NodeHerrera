import { Tarea } from "./tarea.js"
import colors from 'colors'

export class Tareas{
    
    _listado = {}
    
    get listadoArr (){
       const listado = []
       
       //Object.keys me devuelve las llaves ( la palabra de la izquierda )
       Object.keys(this._listado).forEach(key=>{
        const tarea = this._listado[key]
        
        listado.push(tarea)
       })

       return listado
    }
                                              
    constructor(){
        this._listado = {}
    }

    cargarTareasFromArray(data=[]){
        data.forEach(tarea=>{
            this._listado[tarea.id] = tarea;
        })
    }

   crearTarea(desc=""){

    const tarea = new Tarea(desc)
    
    //_listado es un objeto, no un arreglo. Computo el uid como propiedad y le paso la tarea

    this._listado[tarea.id] = tarea
     }

    listadoCompleto(){
        //el segundo argumento del forEach es el índice
        this.listadoArr.forEach((tarea, indice)=>{
            //const idx = indice +1 //para que empiece por 1 y no por cero. Uso un template string para colorearlo en verde

            const idx = `${indice+1}`.green
            const {desc, completadoEn} = tarea //uso desestructuración para extraer desc y completadoEn, 
            //que me sirve para decir si está completado o no
            
            const estado = completadoEn !== null? 'Completado'.green : 'Pendiente'.red
            console.log(`${idx}- ${desc} :: ${estado}`)

        })
     }

     

     listarPendientesCompletadas(completadas = true){
        let indice = 0;
        this.listadoArr.forEach((tarea)=>{

            const {desc, completadoEn} = tarea 
            const estado = completadoEn !== null ? "Completada".green : "Pendiente".red  

            if(completadas){
                if(completadoEn){
                    indice +=1
                    //console.log(`${indice.toString().green}- ${desc} :: ${estado}`)        
                    console.log(`${(indice+ '.').green}- ${desc} :: ${estado}`)        
                }
                
            }else{
                if(!completadas){
                    if(!completadoEn){
                        indice +=1
                        console.log(`${(indice+ '.').green}- ${desc} :: ${estado}`)        
                    }
                }
            }
         }) 
    }                                           
}
