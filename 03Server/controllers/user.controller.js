

const getUser = (req,res) => res.json({msg: "get from API"})
const addUser = (req,res) => res.json({msg: "post from API"})
const updateUser = (req,res) => res.json({msg: "put from API"})
const deleteUser =  (req,res) => res.json({msg: "delete from API"})

export default {
    getUser,
    addUser,
    updateUser,
    deleteUser
}