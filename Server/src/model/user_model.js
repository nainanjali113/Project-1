import mongoose from 'mongoose'
import { validname, validemail, validpassword, validgender } from '../validation/allvalidation.js'
import bcrypt from 'bcrypt'

export const userSchema = new mongoose.Schema({
    profileImg: { type: Object, required: false },
    name: { type: String, required: [true, 'name is required'], validate: [validname, 'name is not valid'], trim: true },
    email: { type: String, required: [true, 'email is required'], validate: [validemail, 'email is not valid'], trim: true, unique: true, lowercase: true },
    password: { type: String, required: [true, 'password is required'], validate: [validpassword, 'password is not valid'], trim: true },
    gender: { type: String, required: [true, 'gender is required'], validate: [validgender, 'gender id not valid'], trim: true },
    Verification: {
        user: {
            isVerify: { type: Boolean, default: false },
            userOtp: { type: Number, default: null },
            otpExpireTime: { type: Number, default: null },
            isblock: { type: Boolean, default: false },
            blockStatus: { type: String, default: null, enum: [] },
            isDelete: { type: Boolean, default: null },
        },
        admin:{
            isVerify:{type:Boolean,default:false},
            otp:{type:Number,default:null},
        },
    }
})

userSchema.pre('save', async function() {this.password=await bcrypt.hash(this.password, 10) })

export default mongoose.model('Data',userSchema)