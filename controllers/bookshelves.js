import { Bookshelf } from "../models/bookshelf.js"
import { Profile } from "../models/profile.js"


async function create(req, res) {
  try {
    const book = await Bookshelf.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { bookshelf: book } },
      { new: true }
    )
    res.status(201).json(profile)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const bookshelf = await Bookshelf.findById(req.params.bookshelfId)
      .populate(['myBooks'])
    res.status(200).json(bookshelf)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const bookshelf = await Bookshelf.findById(req.params.bookshelfId)
    bookshelf.mybooks.push(req.body.bookId) 
    await bookshelf.save()
    res.status(200).json(bookshelf)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteBook(req, res) {
  try {
    const bookshelf = await Bookshelf.findById(req.params.bookshelfId)
    bookshelf.myBooks.remove({ _id: req.params.bookId })
    await bookshelf.save()
    res.status(200).json(blog)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
  show,
  update,
  deleteBook as delete
}