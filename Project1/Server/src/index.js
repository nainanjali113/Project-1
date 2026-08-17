import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {routes} from './routes/routes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())  

mongoose.connect(process.env.MongoDbUrl)
    .then(() => console.log('Database is connected successfully...'))
    .catch((e) => console.log('Database is not connetced...'))

app.use('/', routes)

app.listen(port, () => console.log(`Server is running on - http://localhost:${port}`))
