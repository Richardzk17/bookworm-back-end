import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookshelfSchema = new Schema({
  myBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
},{
  timestamps: true,
})

const Bookshelf = mongoose.model('Bookshelf', bookshelfSchema)

export { Bookshelf }