import Comment from "../models/comment-model.js";
const addComment = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, mediaType, comment } = req.body;
    const newComment = new Comment({
      email: email,
      mediaType: mediaType,
      mediaId: id,
      text: comment,
    });
    await newComment.save();
    return res.status(201).json({ message: "Successfully added new comment",newComment });
  } catch (error) {
    return res.status(500).json({ error: "Error while adding new comment" });
  }
};

const getAllComments = async (req, res) => {
  try {
    const { id,mediaType } = req.body;
    const comments = await Comment.find({ mediaId: id, mediaType: mediaType });
    return res
      .status(201)
      .json({ comments });
  } catch (error) {
    return res.status(500).json({ error: "Error while retrieving comments" });
  }
};

const deleteComment=async(req,res)=>{
  try {
    const {id}=req.params;
    const result=await Comment.findByIdAndDelete(id);
    if(!result){
      return res.status(404).json({message:"Could not delete the comment"});
    }
    return res.status(201).json({message:"Successfully deleted message"});
  } catch (error) {
    return res.status(500).json(({error:"Error while deleting comment"}));
  }
}
export { addComment, getAllComments, deleteComment };
