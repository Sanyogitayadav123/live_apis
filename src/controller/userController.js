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

export const signInController = async(req,res)=>{
    const{email,password} = req?.body
    try{
        const user = await UserModal.findOne({email})
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({message:"User not found"})
        }
        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(StatusCodes.NOT_FOUND).json({message:"Password not matched"})
        }
         const token = await user.generateAuthToken()
         return res.status(StatusCodes.OK).json({
            success:true,
            message:"User login is succesfull",
            user:user,
            token:token
         })
    }
    catch(err){

    }
}