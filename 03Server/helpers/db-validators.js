import mongoose from "mongoose"
import Role from "../models/role.js"
import Usuario from "../models/usuario.js"

export const esRolValido = async(rol="")=>{      //validación contra la DB
    const existeRol = await Role.findOne({rol})

    if(!existeRol){
        throw new Error("El rol no existe")
    }

}

export const existeMail = async(correo)=>{
    const existeEmail = await Usuario.findOne({correo})

    if(existeEmail){
       throw new Error("El email ya existe")
    }

    return existeMail
}

export const userExistsById = async(id)=>{
    const existeUsuario= await Usuario.findById(id)

    if(!existeUsuario) throw new Error("El id no existe")
    
}