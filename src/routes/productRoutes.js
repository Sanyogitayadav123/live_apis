import express from 'express'
import { getProductController, postProductController } from '../controller/productController.js'
import upload from '../middleware/uploadImages.js'

const productRoutes = express.Router()

productRoutes.post('/insert-product',upload.single('image') ,postProductController)
productRoutes.get('/get-product',getProductController)


export default productRoutes