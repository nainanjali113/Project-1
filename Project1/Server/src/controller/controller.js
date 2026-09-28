import user_model from "../model/user_model.js"
import { error } from '../error/errorhandling.js'
import { EmailOtp, ResendOtp } from "../mail/user_mail.js"
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const Create_user = async (req, res) => {
    try {
        const data = req.body
        // console.log(data) 
        const { name, email, password, gender } = data
        // console.log(name,email,password,gender)

        const randomOtp = crypto.randomInt(1000, 10000)
        const expireTime = Date.now() + 1000 * 60 * 5

        // console.log(name,email,randomOtp)

        const checkuser = await user_model.findOneAndUpdate({ email: email },
            { $set: { 'Verification.user.userOtp': randomOtp, 'Verification.user.otpExpireTime': expireTime } }
        )

        if (checkuser) {
            if (checkuser.Verification.user.isVerify) return res.status(400).send({ status: false, success: false, msg: 'Account already verified pls log in', data: db })
            EmailOtp(email, checkuser.name, randomOtp)
            const db = { id: checkuser._id, name: checkuser.name, email: checkuser.email }
            return res.status(200).send({ status: true, success: true, msg: 'Resent Otp' })
        }

        const DBData = {
            name, email, password, gender, Verification: { user: { userOtp: randomOtp, otpExpireTime: expireTime } }
        }

        const DB = await user_model.create(DBData)
        const db = {
            name: DB.name, email: DB.email, id: DB._id
        }
        ResendOtp(email, name, randomOtp)
        return res.status(200).send({ status: true, success: true, msg: 'user is created successfully', data: db })

    }
    catch (e) { { error(e, res) } }
}


export const Verify_user = async (req, res) => {
    try {
        const { id } = req.params
        const Otp = req.body.Otp
        console.log(id)

        if (!Otp) return res.status(400).send({ status: false, success: false, msg: 'pls provide Otp' })

        const checkuser = await user_model.findById(id)
        if (!checkuser) return res.status(400).send({ status: false, success: false, msg: 'User not found' })

        const { userOtp, otpExpireTime } = checkuser.Verification.user
        if (!(Date.now() <= otpExpireTime)) return res.status(400).send({ status: false, success: false, msg: 'Otp Expire' })

        if (userOtp != Otp) return res.status(400).send({ status: false, success: false, msg: 'Wrong Otp' })

        await user_model.findByIdAndUpdate(id, { $set: { 'Verification.user.isVerify': true } })
        res.status(200).send({ status: true, success: true, msg: 'Otp Verify Successfully pls login' })
    }
    catch (e) { error(e, res) }
}


export const resendOtp = async (req, res) => {
    try {
        const { id } = req.params

        const expireTime = Date.now() + 1000 * 60 * 5
        const randomOtp = crypto.randomInt(1000, 10000)

        const UpdateOtp = await user_model.findOneAndUpdate({ _id: id, 'Verification.user.isVerify': false },
            { $set: { 'Verification.user.userOtp': randomOtp, 'Verification.user.otpExpireTime': expireTime } }
        )

        if (!UpdateOtp) return res.status(404).send({ status: false, msg: 'User not found' })
        EmailOtp(UpdateOtp.email, UpdateOtp.name, randomOtp)
        res.status(200).send({ status: true, msg: 'Otp is Resent' })
    }
    catch (e) {
        { error(e, res) }
    }
}


export const Login_user = async (req, res) => {
    try {
        const { email, password } = req.body
        // console.log(req.body)
        const checkuser = await user_model.findOne({ email: email })
        if (!checkuser) return res.status(404).send({ status: false, msg: 'User not found' })

        if (checkuser) {
            const { isVerify, isDelete, block } = checkuser.Verification.user
            if (!isVerify) return res.status(404).send({ status: false, msg: 'pls verify otp', id: checkuser._id })
            if (isDelete) return res.status(404).send({ status: false, msg: 'Account is deleted' })
            if (block) return res.status(404).send({ status: false, msg: 'Your Account is Blocked by Admin' })
        }
        const checkPass = await bcrypt.compare(password, checkuser.password)
        if (!checkPass) return res.status(404).send({ status: false, msg: 'Wrong Password' })

        const token = jwt.sign({ id: checkuser._id }, process.env.Usertoken, { expiresIn: '1d' })
        res.status(200).send({ status: true, msg: 'User Login Successfully', token, id: checkuser._id })

    }
    catch (e) { error(e, res) }
}


export const get_all_user = async (req, res) => {
    try {
        const DB = await user_model.find().select({ email: 1 }).sort({ createdAt: -1 })

        if (DB.length == 0) return res.status(404).send({ status: false, msg: 'User not found' })
        res.status(200).send({ status: true, data: DB })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
