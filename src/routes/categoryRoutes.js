import express from 'express'
import { postCategoryController } from '../controller/categoryController.js'

const categoryRoutes = express.Router()

categoryRoutes.post('/insert-category',postCategoryController)

export default categoryRoutes 
