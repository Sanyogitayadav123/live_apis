import express from 'express'
import { deleteProductById, getProductByIdController, getProductController, postProductController, updateProductByIdController } from '../controller/productController.js'
import upload from '../middleware/uploadImages.js'

const productRoutes = express.Router()

productRoutes.post('/insert-product',upload.single('image') ,postProductController)
productRoutes.get('/get-product',getProductController)
productRoutes.get('/get-product-by-id/:id',getProductByIdController)
productRoutes.put('/update-product-by-id/:id',upload.single('image'),updateProductByIdController);
productRoutes.delete('/delete-product-by-id/:id', deleteProductById);

export default productRoutes;