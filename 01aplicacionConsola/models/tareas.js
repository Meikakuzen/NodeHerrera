import { Tarea } from "./tarea.js"


export class Tareas{
    
    _listado = {}  //lo voy a trabajar como un objeto, aunque con el getter lo transformo a arreglo
    
    get listadoArr (){  //usaré el getter con this.listadoArr como si fuera una propiedad de la clase
       const listado = []
       
       //Object.keys me devuelve las llaves ( la palabra de la izquierda )
       //esta tarea es síncrona
       Object.keys(this._listado).forEach(key=>{
        const tarea = this._listado[key]
        
        listado.push(tarea)
       })

       return listado
    }
                                              
    constructor(){
        this._listado = {}
    }

    cargarTareasFromArray(data=[]){ //le pasaré el resultado de leerDB()
        data.forEach(tarea=>{
            this._listado[tarea.id] = tarea;
        })
    }

   crearTarea(desc=""){

    const tarea = new Tarea(desc)
    
    //_listado es un objeto, no un arreglo. Computo el uid como propiedad y le paso la tarea para darle formato al objeto

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
            const estado = (completadoEn !== null) ? "Completada".green : "Pendiente".red  

            if(completadas){
                if(completadoEn){
                    indice +=1
                    //console.log(`${indice.toString().green}- ${desc} :: ${estado}`)        
                    console.log(`${(indice+ '.').green}- ${desc} :: ${completadoEn.green}`)    
                }
                
            }else{
            
                    if(!completadoEn){
                        indice +=1
                        console.log(`${(indice+ '.').green}- ${desc} :: ${estado}`)        
                    }
                
            }
         }) 
    }  
    
    borrarTarea(id=""){
        //aqui creo la funcion de borrar, pero quiero mostrarle a la persona salirse del menú de eliminación sin borrar nada
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    toggleCompletadas(ids= []){
        ids.forEach(id=>{
            const tarea = this._listado[id] //al trabajar con un objeto puedo ir directamente a la propiedad que me interesa
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString() //no puedo almacenar el objeto Date propiamente pero si toISOString
            }
        })

        
        //lógica para desmarcar una tarea como completada
        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                //se puede hacer en una sola linea
                this._listado[tarea.id].completadoEn = null
            }
        })
    }
}
