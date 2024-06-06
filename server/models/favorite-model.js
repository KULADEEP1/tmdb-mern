import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  },
  mediaId: {
    type: String,
    required: true,
  },
});

const Favorite = mongoose.model("favorite", favoriteSchema);
export default Favorite;
