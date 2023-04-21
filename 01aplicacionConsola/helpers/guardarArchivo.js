import fs from 'fs'

const archivo = './db/data.json'

export const guardarDB = ( data )=>{
    
    //tiene que existir la carpeta para que funcione
    
    fs.writeFileSync(archivo, JSON.stringify(data))
}

export const leerDB =()=>{
    if(!fs.existsSync(archivo)){
        return null  // si no existe regreso null
    }



    const info = fs.readFileSync(archivo,{encoding: 'utf-8'})//esto daría error si el archivo no existiera por eso la verificación con el if de antes
        //tengo que pasarle el encoding para que no me regrese los bytes

        //tengo que parsear info porque me devuelve un string 
    const data = JSON.parse(info)
    
    return data
}