import React,{useState} from "react";

function CreatePost({ addPost }){
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")

  const handleSubmit = () => {
    const newPost = {title, content};
    // addPost(newPost);
    // api 요청 서버로 새 게시글 작성 


    // 
    setTitle("");
    setContent("");
  };


  return(
    <>
      <h3>글 작성 페이지</h3>
      <div>
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>내용</label>
        <textarea 
          rows="4" cols="50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleSubmit}>글 작성하기</button>

    </>
  );
};

export default CreatePost;