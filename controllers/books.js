import { Book } from "../models/book.js"
import { Profile } from "../models/profile.js"

async function index(req, res) {
  try {
    const books = await Book.find({})
    // good feature to implement
    // .sort({createdAt: 'desc'})
    res.status(200).json(books)
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
    .populate(['comments', 'reviews'])
    res.status(200).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

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

async function deleteComment(req, res) {
  try {
    const book = await Book.findById(req.params.bookId)
    const commentIndex = book.comments.findIndex(comment => comment._id == req.params.commentId)
    book.comments.splice(commentIndex, 1)
    await book.save()
  res.status(201).json(commentIndex)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteReview(req, res) {
  try {
    const book = await Book.findById(req.params.bookId)
    const reviewIndex = book.reviews.findIndex(review => review._id == req.params.reviewId)
    book.reviews.splice(reviewIndex, 1)
    await book.save()
  res.status(201).json(reviewIndex)
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

async function update(req, res) {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true }
      ).populate('comments', 'reviews')
    res.status(200).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  index, 
  create, 
  show, 
  createComment,
  createReview,
  deleteReview,
  deleteComment,
  update
}