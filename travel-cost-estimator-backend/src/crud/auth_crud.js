const {User} = require('./../models')

const signup = async(data)=>{
    try{
        const user = await User.create(data)
        return user
    }catch(error){
        console.log(`Error while creating user ${error}`)
    }
}

const login = async(email)=>{
    try{
        const user = await User.findOne({where:{email}})
        return user
    }catch(error){
        console.log(`Error while logging in ${error}`)
    }
}

module.exports = {login,signup}