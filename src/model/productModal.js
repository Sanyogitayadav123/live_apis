import mongoose from 'mongoose'
const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    qut:{
        type:String,
     required:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"live-category"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"live-user-details"
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"live-brand"

    }
},
{ timestamps: true })

const ProductModal = mongoose.model('live-product',productSchema)

export default ProductModal