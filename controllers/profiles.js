import { Profile } from '../models/profile.js'
import { Book } from '../models/book.js'
import { v2 as cloudinary } from 'cloudinary'


async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId)
    .populate(['bookshelf'])
    res.status(200).json(profile)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const addToBookshelf = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)
    const profile = await Profile.findById(req.params.profileId)
    profile.bookshelf.push(book._id)
    await profile.save()
    res.status(200).json(profile)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteFromBookshelf(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId)
    const bookIndex = profile.bookshelf.findIndex(book => book == req.params.bookId)
    const removedBook = profile.bookshelf.splice(bookIndex, 1)
    await profile.save()
    res.status(201).json(removedBook[0])
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { 
  index, 
  addPhoto, 
  show,
  addToBookshelf,
  deleteFromBookshelf,
}
