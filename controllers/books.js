import { Book } from "../models/book.js"
import { Profile } from "../models/profile.js"

async function index(req, res) {
  try {
    const books = await Book.find({})
    // good feature to implement
    // .sort({createdAt: 'desc'})
    res.status(201).json(books)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
} 

async function create(req, res) {
  try {
    const book = await Book.create(req.body)
    res.status(201).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const book = await Book.findById(req.params.bookId)
    .populate(['comments'])
    res.status(200).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


// We don't want users to be able to change books, because it will affect other users
// async function update(req, res) {
//   try {
//     const book = await Book.findByIdAndUpdate(
//       req.params.bookId,
//       req.body,
//       { new: true })
//     .populate('author')
//     res.status(200).json(book)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

async function createComment(req, res) {
  try {
    req.body.author = req.user.profile
    const book = await Book.findById(req.params.bookId)
    book.comments.push(req.body)
    await book.save()

    const newComment = book.comments[book.comments.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newComment.author = profile
    res.status(201).json(newComment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createReview(req, res) {
  try {
    req.body.author = req.user.profile
    const book = await Book.findById(req.params.bookId)
    book.reviews.push(req.body)
    await book.save()

    const newReview = book.reviews[book.reviews.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newReview.author = profile
    res.status(201).json(newReview)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteReview(req, res) {
  try {
    const reviewToDelete = await Book.reviews.findByIdAndDelete(req.params.reviewId)
    const book = await Book.findById(req.params.bookId)
    book.reviews.remove({ _id: req.params.reviewId })
    await book.save()
    res.status(200).json(reviewToDelete)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  index, 
  create, 
  show, 
  update,
  createComment,
  createReview,
  deleteReview
}