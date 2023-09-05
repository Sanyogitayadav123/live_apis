import ProductModal from "../model/productModal.js"
import { StatusCodes } from 'http-status-codes'


export const postProductController = async(req,res)=>{
    const image = req?.file?.filename
    const {productName,price,description,qut,categoryId,userId,brandId} = req?.body
    // const value = {productName,price,description,qut,categoryId,userId,brandId}
    // console.log('value', value)
    // console.log('image', image)

    try{
        const data = await ProductModal.create({
            productName,
            price,
            description,
            qut,
            categoryId,
            userId,
            brandId,
            image,
          });
          
        return res.status(StatusCodes.OK).json({
            success:true,
            message:"Category add is sucessfull !",
            product:data,
         })
    }
    catch(err){
        console.log('err', err)
        return res.status(StatusCodes.CREATED).json({success:false, message:"failed", Error:err.message})
    }

}