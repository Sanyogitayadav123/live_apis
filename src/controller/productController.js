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

// export const getProductController = async (req, res) => {
//     try {
//         const data = await ProductModal.find()
//             .populate('userId')     // Replace 'userId' with the actual field name
//             .populate('brandId')    // Replace 'brandId' with the actual field name
//             .populate('categoryId'); // Replace 'categoryId' with the actual field name

//         return res.status(StatusCodes.OK).json({
//             success: true,
//             message: "Fetch data!",
//             product: data,
//         });
//     } catch (err) {
//         console.log('err', err);
//         return res.status(StatusCodes.CREATED).json({
//             success: false,
//             message: "failed",
//             Error: err.message
//         });
//     }
// };

export const getProductController = async (req, res) => {
    try {
    

        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default to 1)
        const perPage = parseInt(req.query.perPage) || 10; // Get the number of items per page (default to 10)

        const skip = (page - 1) * perPage; // Calculate the number of documents to skip
        const totalProducts = await ProductModal.countDocuments(); // Get the total number of products

        const data = await ProductModal.find()
            .skip(skip)
            .limit(perPage)
            .populate('userId')
            .populate('brandId')
            .populate('categoryId');

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Fetch data!",
            product: data,
            totalPages: Math.ceil(totalProducts / perPage),
            currentPage: page,
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

