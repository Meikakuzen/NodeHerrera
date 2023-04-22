import {v4} from 'uuid'


export class Tarea{
    
    //inicializar así las variables no es necesario, pero hecho así se asemeja a otros lenguajes
    
    id=''
    desc=''
    completadoEn = null //si es null significa no completado pero si tiene algo es que está completado. Se puede manejar así

    //lo único que voy a pedir es la descripción de la tarea
    constructor(desc){
        this.desc = desc;
        this.id = v4()  //generador de uuid
        this.completadoEn = null //esto es redundante pero así queda más claro
    }

}