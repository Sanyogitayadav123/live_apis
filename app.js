import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectionDB from './src/db/db.js'
import userRoutes from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import categoryRoutes from './src/routes/categoryRoutes.js'
import path from 'path'
import brandRoutes from './src/routes/brandRoutes.js'

const PORT = process.env.PORT ||5000


connectionDB()
const app = express()

app.use(express.json())
const __dirname = path.resolve()
app.use('/public', express.static(path.join(__dirname, './public')))
app.use(cors())

// Routes 
app.use('/api/users',userRoutes) 
app.use('/api/product',productRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/brand',brandRoutes)



app.listen(PORT,()=>{
    console.log(`Server is runing PORT:${PORT}`)
})