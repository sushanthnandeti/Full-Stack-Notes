import React, {useEffect, useState, useContext} from "react";
import {useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';
import { useNavigate } from "react-router-dom";
function Post() {

  let { id } = useParams();
  const [postObject, setPostObject] = useState({}); 
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState(""); 
  const {authState} = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(()=>{
    axios.get(`https://full-stack-api-sushanthnandeti-5a86740447dd.herokuapp.com/posts/byid/${id}`).then((response) => {
          setPostObject(response.data);
    });

    axios.get(`https://full-stack-api-sushanthnandeti-5a86740447dd.herokuapp.com/comments/${id}`).then((response) => {
          setComments(response.data);
    });
  
}, [id]);

  const addComment = () => {
      axios.post("https://full-stack-api-sushanthnandeti-5a86740447dd.herokuapp.com/comments", {commentBody: newComment , PostId: id
              },
              {
                headers: {
                  accessToken : localStorage.getItem("accessToken"),
                },
              }
              ).then((response)=>{

              if(response.data.error) {
                alert(response.data.error);
              }
              else{
              const commentToAdd = {commentBody: newComment, username: response.data.username,
              id: response.data.id};
              setComments([...comments, commentToAdd]);
              setNewComment("");
              }
      });
  };

  const deleteComment = (id) => {
      axios.delete(`https://full-stack-api-sushanthnandeti-5a86740447dd.herokuapp.com/comments/${id}`, 
      {headers: {accessToken: localStorage.getItem("accessToken")},
    }).then(()=>{
        setComments(
          comments.filter((val)=>{
            return val.id !== id;
          })
        );
      });
  };

  const editPost = (option) => {
      if (option=== "title"){
          let newTitle = prompt("Enter new Title:");
          axios.put("https://full-stack-api-sushanthnandeti-5a86740447dd.herokuapp.com/posts/title", 
          {newTitle:newTitle, id: id}, {headers: {accessToken: localStorage.getItem("accessToken")},
        });

        setPostObject({...postObject, title: newTitle});
      }   
      else {
        let newPostText = prompt("Enter new body Text:");
        axios.put("https://full-stack-api-sushanthnandeti-5a86740447dd.herokuapp.com/posts/postText", 
          {newText:newPostText, id: id}, {headers: {accessToken: localStorage.getItem("accessToken")},
      });
      setPostObject({...postObject, postText : newPostText})
      }
     
  }

  const deletePost = (id) => {
      axios.delete(`https://full-stack-api-sushanthnandeti-5a86740447dd.herokuapp.com/posts/${id}`, 
      {headers: {accessToken: localStorage.getItem("accessToken")},
    }).then(()=>{
        navigate("/");  
      })
  }

  return (
    <div className="postpage">

        <div className="leftSide">  
          <div className="post" id = "individual">
            <div className="title" onClick={()=> 
              { if(authState.username === postObject.username) {
                editPost("title")}}
                }> {postObject.title} </div>
            <div className="body" onClick={()=> 
              { if(authState.username === postObject.username) {
                editPost("body")}}
              }> {postObject.postText} </div>
            <div className="footer"> {postObject.username} 
            { authState.username === postObject.username && 
              <button onClick={()=>{
                deletePost(postObject.id);
              }}> 
              Delete Post </button>}
            </div>
          </div>
        
        </div>
          <div className="rightSide"> 
            <div className="addCommentContainer">
                <input type="text" placeholder="comment..." onChange={(event) => {setNewComment(event.target.value)}}
                  value = {newComment}
                />
                <button onClick={addComment}>Add Comment</button>
            </div>

            <div className="listOfComments" >

              {comments.map((comment, key)=> {
                  return <div key={key} className="comment">
                     {comment.commentBody} 
                     <label> username: {comment.username} </label>
                    { authState.username === comment.username && 
                    <button onClick={() => {deleteComment(comment.id)}}> Delete </button>}
                     </div>
 
              })}

            </div>
          </div>

    </div>
   
  );
}

export default Post;