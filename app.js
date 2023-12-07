import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

import db_connection from './config/db_connection.js'
import user_router from './routes/user_router.js'


const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL


db_connection(DATABASE_URL)

// ROUTES
app.use('/api/user', user_router)



app.listen(PORT, (err)=> {
    if(err) throw err
    console.log("SERVER LISTENING ON PORT ", PORT)
})


