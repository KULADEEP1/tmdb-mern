import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
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
  text: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("comment", commentSchema);
export default Comment;
