import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    otp: {
        value: { type: String },
        expire: { type: Date },
    },
    userImage: {
        type: String
    }

},
    { timestamps: true })

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
            expiresIn: '2h'
        })
        return token
    }
    catch (err) {
        console.log('Token is not generated', err)
    }

}
const UserModal = mongoose.model('live-user-details', userSchema)

export default UserModal
