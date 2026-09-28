import express from 'express'
import { Create_user, Verify_user, Login_user,resendOtp, get_all_user } from '../controller/controller.js'

export const routes=express.Router()

routes.post('/create',Create_user)
routes.post('/verify/:id',Verify_user)
routes.post('/resend/:id',resendOtp)
routes.post('/login',Login_user)
routes.get('/get_all_user',get_all_user)

routes.use((req,res)=>{ res.status(404).send({status:false,success:false,msg:'Invalid Url' }) })    