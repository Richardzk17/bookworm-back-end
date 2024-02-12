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


export {
  create
}