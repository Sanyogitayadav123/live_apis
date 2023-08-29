import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.methods.generateAuthToken= async function(){
    try{
        const token = await jwt.sign({_id:this._id}, process.env.SECRET_KEY,{
            expiresIn:'2h'
        })
        return token
    }
    catch(err){
        console.log('Toekn is not generate', err)
    }

}
 const UserModal = mongoose.model('live-user-details',userSchema)

 export default UserModal
