import express from 'express'
import DB from './db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import blogRoutes from './Routes/blogRoutes.js'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
app.use(express.json())
app.use(bodyParser.json())
DB()
app.use(cors())
app.use('/api/blogposts', blogRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
  )
)
