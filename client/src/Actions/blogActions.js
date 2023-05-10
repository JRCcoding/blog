import axios from 'axios'

export const createBlogpost = (order) => async () => {
  await axios.post(`/api/blogposts`, order)
}
