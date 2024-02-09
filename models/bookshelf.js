import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookshelfSchema = new Schema({
  myBook: [{type: Schema.Types.ObjectId, ref: 'Book'}]
},{
  timestamps: true,
})

const Bookshelf = mongoose.model(bookshelfSchema)

export { Bookshelf }