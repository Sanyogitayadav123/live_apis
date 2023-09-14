import express from 'express'
import { getProductByIdController, getProductController, postProductController } from '../controller/productController.js'
import upload from '../middleware/uploadImages.js'

const productRoutes = express.Router()

productRoutes.post('/insert-product',upload.single('image') ,postProductController)
productRoutes.get('/get-product',getProductController)
productRoutes.get('/get-product-by-id/:id',getProductByIdController)


export default productRoutes