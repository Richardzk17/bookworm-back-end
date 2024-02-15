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
    .populate(['comments.author', 'reviews.author'])
    res.status(200).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function showByOLId(req, res) {
  try {
    const book = await Book.findOne({OLId: req.params.OLId})
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
    const removedReview = book.reviews.splice(reviewIndex, 1)
    await book.save()
  res.status(201).json(removedReview[0]._id)
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

const updateReview = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    const review = book.reviews.id(req.params.reviewId)
    review.text = req.body.text
    review.rating = req.body.rating
    review.recommended = req.body.recommended
    await book.save()
    res.status(200).json(book)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateComment = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    const comment = book.comments.id(req.params.commentId)
    comment.text = req.body.text
    await book.save()
    res.status(200).json(book)
  } catch (err) {
    res.status(500).json(err)
  }
}


export {
  index, 
  create, 
  show, 
  showByOLId,
  createComment,
  createReview,
  deleteReview,
  deleteComment,
  update,
  updateReview,
  updateComment,
}