import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    // enum: ['1', '2', '3', '4', '5']
  },
  recommended: {
    type: Boolean,
    required: true
  },
  // author: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Profile'
  // }
}, {
  timestamps: true
})

const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  // author: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Profile'
  // }
}, {
  timestamps: true
})

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    comments: [commentSchema]
  },
  { timestamps: true }
)

const Book = mongoose.model('Book', bookSchema)

export { Book }