import mongoose from 'mongoose'

const blogSchema = mongoose.Schema(
  {
    submitId: {
      type: String,
      required: false,
    },
    submitUser: {
      type: String,
      required: false,
    },
    submitUserImage: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
