import React, { useState, useEffect } from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css"; // Import Semantic UI CSS
import "../../css/CommentForm.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addCommentAPI } from "../../utils/api";

const CommentForm = ({ mediaType, id, onNewComment }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });

  const handleCommentText = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const email = user.userInfo.email;
      const response = await addCommentAPI(email, id, mediaType, comment);
      if (response.status === 201) {
        onNewComment(response.data.newComment);
        toast.success("Comment Added Successfully!");
        setComment("");
      } else {
        toast.error("There is error in adding new comment");
      }
    } catch (error) {
      toast.error("Could not ADD comment!");
    }
  };

  const usernameInitial = user.userInfo?.username
    ? user.userInfo.username.charAt(0).toUpperCase()
    : "";

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="comment-form-container">
      <div
        style={{ display: "flex", flexDirection: "row", marginRight: "auto" }}
      >
        <div className="profile-icon">{usernameInitial}</div>
        <div style={{ marginTop: "8px", fontSize: "18px" }}>
          {userInfo.username}
        </div>
      </div>
      <Form onSubmit={handleSubmit} className="comment-form">
        <Form.TextArea
          placeholder="Write your comment..."
          value={comment}
          onChange={handleCommentText}
          rows={3}
          className="comment-textarea"
        />
        <Button className="ui red button" disabled={!comment.trim()}>
          <Icon className="large" name="send" />
          POST
        </Button>
      </Form>
    </div>
  );
};

export default CommentForm;
