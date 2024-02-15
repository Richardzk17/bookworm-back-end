import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  // photo: {
  //   type: String,
  //   default: 'https://imgur.com/kJnQN7i'
  // },
  bookshelf: [{ type: Schema.Types.ObjectId, ref: 'Bookshelf' }]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
