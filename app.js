import express from 'express'
import 'dotenv/config'
import connectionDB from './src/db/db.js'
import userRoutes from './src/routes/userRoutes.js'
const PORT = process.env.PORT ||5000
const app = express()
app.use(express.json())
connectionDB()
app.use('/api/users',userRoutes)


app.listen(PORT,()=>{
    console.log(`Server is runing PORT:${PORT}`)
})