

const getCategorias = (req,res)=>{
    res.json({
        msg: "getCategorias ok"
    })
}

const getCategoria = (req,res)=>{
    res.json({
        msg: "getCategoria ok"
    })
}

const addCategorias = (req,res)=>{
    res.json({
        msg: "addCategorias ok"
    })
}

const updateCategorias = (req,res)=>{
    res.json({
        msg: "updateCategorias ok"
    })
}

const deleteCategorias = (req,res)=>{
    res.json({
        msg: "deleteCategorias ok"
    })
}

export default{
    getCategorias,
    addCategorias,
    updateCategorias,
    deleteCategorias,
    getCategoria

}