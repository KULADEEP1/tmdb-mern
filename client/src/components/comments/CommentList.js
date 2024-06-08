import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteCommentAPI } from "../../utils/api";
import { Icon, Button, Loader } from "semantic-ui-react";
import "../../css/CommentList.css";

const CommentList = ({ comments, setComments }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [visibleComments, setVisibleComments] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreComments = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
      setIsLoading(false);
    }, 2000);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await deleteCommentAPI(commentId);
      if (response.status === 201) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );

        toast.success("Successfully deleted comment");
      }
    } catch (error) {
      toast.error("Could not delete Comment");
    }
  };

  return (
    <div className="comment-list">
      <h3 className="comment-heading">COMMENTS</h3>
      {comments.length > 0 ? (
        <>
          {comments.slice(0, visibleComments).map((comment, index) => (
            <div key={index} className="comment">
              <img
                src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
                alt="Avatar"
                className="avatar"
              />
              <div className="comment-details">
                <div className="comment-author">{comment.email}</div>
                <div className="comment-text">{comment.text}</div>
                {userInfo.email === comment.email && (
                  <div className="reply-section">
                    <Button
                      className="ui red button large"
                      style={{ padding: "5px" }}
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      <Icon name="trash" />
                      DELETE
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {visibleComments < comments.length && (
            <>
              {isLoading ? (
                <Loader
                  active
                  inline="centered"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                />
              ) : (
                <Button
                  className="ui red button large fluid"
                  style={{ marginTop: "10px", marginBottom: "10px" }}
                  onClick={loadMoreComments}
                >
                  Load More
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        <div className="no-comments">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
};

export default CommentList;
