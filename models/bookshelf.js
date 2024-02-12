import mongoose from 'mongoose'

const Schema = mongoose.Schema


const bookshelfSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
)


const Bookshelf = mongoose.model('Bookshelf', bookshelfSchema)

export { Bookshelf }
