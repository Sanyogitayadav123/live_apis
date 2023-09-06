import ProductModal from "../model/productModal.js"
import { StatusCodes } from 'http-status-codes'


export const postProductController = async(req,res)=>{
    const image = req?.file?.filename
    const {productName,price,description,qut,categoryId,userId,brandId} = req?.body
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

export const getProductController = async (req, res) => {
    try {
        const data = await ProductModal.find()
            .populate('userId')     // Replace 'userId' with the actual field name
            .populate('brandId')    // Replace 'brandId' with the actual field name
            .populate('categoryId'); // Replace 'categoryId' with the actual field name

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Fetch data!",
            product: data,
        });
    } catch (err) {
        console.log('err', err);
        return res.status(StatusCodes.CREATED).json({
            success: false,
            message: "failed",
            Error: err.message
        });
    }
};
