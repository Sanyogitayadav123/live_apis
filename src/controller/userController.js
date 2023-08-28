import bcrypt from 'bcrypt'
import UserModal from '../model/userModel.js'
import { StatusCodes } from 'http-status-codes'
export const signUpController = async(req,res)=>{
    const{name,email,phone,password} = req?.body
    try{
        const hashPassword = await bcrypt.hash(password,10)
        const data = await UserModal.create({name,email,phone,password:hashPassword})
        return res.status(StatusCodes.CREATED).json({success:true, message:"Succesfull user signup", user:data})

    }
    catch(err){
        return res.status(StatusCodes.CREATED).json({success:false, message:"Unsuccesfull user", Error:err.message})

    }
}