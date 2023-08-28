import mongoose from 'mongoose'

const connectionDB= async()=>{
try{
    await mongoose.connect(process.env.DB_URL)
    console.log("Data Base connection in succes full")}
catch(err){
    console.log('err', err)
}
}

export default connectionDB