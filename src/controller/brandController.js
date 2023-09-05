import BrandModal from "../model/brandModal.js"
import { StatusCodes } from 'http-status-codes'


export const postBrandController = async(req,res)=>{
    const{brandName} = req?.body
    try{
        const data = await BrandModal.create({brandName})
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Brand add is sucessfull !",
            brand:data,
         })
    }
    catch(err){
        return res.status(StatusCodes.CREATED).json({success:false, message:"failed", Error:err.message})
    }

    
}