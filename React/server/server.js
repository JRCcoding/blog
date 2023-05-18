import express from 'express'
import DB from './db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import blogRoutes from './Routes/blogRoutes.js'
import bodyParser from 'body-parser'
import multer from 'multer'
import fs from 'fs'

dotenv.config()

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
DB()
app.use(cors())
app.use('/api/blogposts', blogRoutes)

const PORT = process.env.PORT || 5000

const today = new Date()
const splitToday = JSON.stringify(today).split('-')
const year = splitToday[0]
const month = splitToday[1]
const day = splitToday[2].substring(0, 2)
const submitDate = month + '-' + day + '-' + year.substring(1, 5)
const fileType = (str) => {
  str.slice(str.lastIndexOf('.'))
}
// const upload = multer({
//   dest: 'images/',
//   limits: {
//     fileSize: 999999999999,
//   },
// })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, `${submitDate}.jpg`)
  },
})

const upload = multer({ storage: storage })

app.use('/api/images', express.static('images'))
// app.get('/images', (req, res) => {
//   // do a bunch of if statements to make sure the user is
//   // authorized to view this image, then

//   const imageName = `${submitDate}.jpg`
//   const readStream = fs.createReadStream(`images/${imageName}`)
//   readStream.pipe(res)
// })

app.post('/api/images', upload.single('image'), (req, res) => {
  const imageName = `${submitDate}.jpg`
  const description = req.body.description

  // Save this data to a database probably

  console.log(description, imageName)
  res.send({ description, imageName })
})

app.delete('/api/images/delete', (req, res) => {
  const { fileName } = req.query

  // Delete the image file
  fs.unlink(`client/public/images/${fileName}`, (error) => {
    if (error) {
      console.error(error)
    }
  })
  console.log(req.body)
})
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan
  )
)
