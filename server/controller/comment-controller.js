import Comment from "../models/comment-model.js";
const addComment=async(req,res)=>{
    try {
        const id = req.params.id;
        const { email, mediaType ,comment} = req.body;
        console.log(email,mediaType,comment);
        const newComment = new Comment({
          email: email,
          mediaType: mediaType,
          mediaId: id,
          text:comment,
        });
        await newComment.save();
        return res.status(201).json({message:"Successfully added new comment"});
    } catch (error) {
        return res.status(500).json({error:"Error while adding new comment"});
    }
};

export {addComment};