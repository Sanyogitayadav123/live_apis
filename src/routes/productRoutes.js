import express from 'express'
import { postProductController } from '../controller/productController.js'
import upload from '../middleware/uploadImages.js'

const productRoutes = express.Router()

productRoutes.post('/insert-product',upload.single('image') ,postProductController)

export default productRoutes