import ProductModal from '../model/productModal.js';
import { StatusCodes } from 'http-status-codes';

export const postProductController = async (req, res) => {
  const image = req?.file?.filename;
  const { productName, price, description, qut, categoryId, userId, brandId } =
    req?.body;
  try {
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
      success: true,
      message: 'Product added successfully !',
      product: data,
    });
  } catch (err) {
    console.log('err', err);
    return res
      .status(StatusCodes.CREATED)
      .json({ success: false, message: 'failed', Error: err.message });
  }
};

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
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const skip = (page - 1) * perPage;
    const totalProducts = await ProductModal.countDocuments();

    const data = await ProductModal.find()
      .skip(skip)
      .limit(perPage)
      .populate('userId')
      .populate('brandId')
      .populate('categoryId');

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Fetch data!',
      product: data,
      totalPages: Math.ceil(totalProducts / perPage),
      currentPage: page,
    });
  } catch (err) {
    console.log('err', err);
    return res.status(StatusCodes.CREATED).json({
      success: false,
      message: 'failed',
      Error: err.message,
    });
  }
};

export const getProductByIdController = async (req, res) => {
  const { id } = req?.params;
  try {
    const data = await ProductModal.findById(id)
      .populate('userId')
      .populate('brandId')
      .populate('categoryId');
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: 'Fetched product by Id', product: data });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'failed',
      error: err.message,
    });
  }
};

export const updateProductByIdController = async (req, res) => {


  try {
    const { id } = req?.params;
    const body = req?.body;
    const image = req?.file?.filename;

    const data = await ProductModal.findByIdAndUpdate(id, { ...body,image }, { new: true }).populate('userId')
      .populate('brandId')
      .populate('categoryId');
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Product updated successfully!!',
      product: data,
    });
  } catch (err) {
    console.error('err', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to update product',
      error: err.message,
    });
  }
}


export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const body = req?.body;

  try {
    const data = await ProductModal.findByIdAndDelete(id)
    if (!data) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Product not found',
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Product deleted successfully',
      product: data,
    });
  } catch (err) {
    console.log('err', err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to delete product',
      error: err.message,
    });
  }
}