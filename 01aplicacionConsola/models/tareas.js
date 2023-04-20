export class Tareas{
    
    //no quiero manejar listado como un arreglo, pero significaría que a cada rato voy a tener que estar buscando el índice
    //barriendo todo para saber en que posición está algún elemento. Entonces lo quiero manejar como un objeto
    _listado = {} // en realidad no hace falta definirlo aqui, se define en el constructor, pero lo hace más fácild e observar
    //lo que busco es manejarlo como un objeto {'uuid-2323-3434-4-687-8-6-5': Tarea: {id:12, desc:"uhuhkuhku", completadoEn:23-32-1999},
                                              
    constructor(){
        this._listado = {}
    }

    //aqui van los métodos para insertar, completar, etc
                                            
                                            
                                            
}