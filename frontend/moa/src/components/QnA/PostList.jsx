import React, {useState} from "react";
// import { useEffect } from "react"; 나중에 서버 통신 할 때 

function PostList(){
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
    //fetch("") 

  return(
    <>
      <h3>질문/교정 게시글 리스트</h3>
      <ul>
        {posts.map((post)=>(
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};

export default PostList;