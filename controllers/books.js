import { Book } from "../models/book.js"
import { Profile } from "../models/profile.js"

async function index(req, res) {
  try {
    const books = await Book.find({})
    .sort({createdAt: 'desc'})
    res.status(201).json(book)
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

export {
  create, 
  show, 
  createComment,
}