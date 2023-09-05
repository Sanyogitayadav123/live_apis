import express from 'express'
import { postBrandController } from '../controller/brandController.js'

const brandRoutes = express.Router()

brandRoutes.post('/insert-brand',postBrandController)

export default brandRoutes