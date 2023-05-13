import express from 'express'
import DB from './db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import blogRoutes from './Routes/blogRoutes.js'
import bodyParser from 'body-parser'
import { auth } from 'express-oauth2-jwt-bearer'

dotenv.config()

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
DB()
app.use(cors())
app.use('/api/blogposts', blogRoutes)

const PORT = process.env.PORT || 5000

//      AUTH0 CONFIG
const jwtCheck = auth({
  audience: 'http://localhost:3000',
  issuerBaseURL: 'https://dev-dstps3q4l34f7d23.us.auth0.com/',
  tokenSigningAlg: 'RS256',
})
app.use(jwtCheck)

app.get('/authorized', function (req, res) {
  res.send('Secured Resource')
})

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
  )
)
