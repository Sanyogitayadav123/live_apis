import CategoryModal from '../model/categoryModal.js';
import { StatusCodes } from 'http-status-codes';



export const postCategoryController = async (req, res) => {
  const { categoryName } = req?.body;
  try {
    const data = await CategoryModal.create({ categoryName });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: 'Category add is sucessfull !',
      category: data,
    });
  } catch (err) {
    return res
      .status(StatusCodes.CREATED)
      .json({ success: false, message: 'failed', Error: err.message });
  }
};
