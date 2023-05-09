import mongoose from 'mongoose'
import dotenv from 'dotenv'
import blogposts from './Data/blogposts.js'
import Blog from './Models/blogModel.js'
import DB from './db.js'

dotenv.config()

DB()

const importData = async () => {
  try {
    await Blog.deleteMany()

    await Blog.insertMany(blogposts)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Blog.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
