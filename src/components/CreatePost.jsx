import { useContext, useRef } from "react";
import {PostList} from "../store/post-list-store";
const Createpost=()=>{
 const {addPost}= useContext(PostList)
  const userIdElement= useRef();
  const postTitleElement= useRef();
  const postBodyElement= useRef();
  const reactionsElement=useRef();
  const tagsElement= useRef();
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    const userId=userIdElement.current.value;
    const postTitle=postTitleElement.current.value;
    const postbody=postBodyElement.current.value;
    const reactions=reactionsElement.current.value;
    const tags=tagsElement.current.value.split(" ");
    userIdElement.current.value="";
    postTitleElement.current.value="";
    reactionsElement.current.value="";
    tagsElement.current.value="";


    addPost(userId,postTitle,postbody,reactions,tags);
  } 
  return (
    <form className="create-post" onSubmit={handleSubmit}>

      <div className="mb-3">
      <label htmlFor="userId" className="form-label">User-id</label>
      <input type="text" ref={userIdElement} rows="4" className="form-control" id="userId" placeholder=" Enter Your user-id here " />
    </div>

    <div className="mb-3">
      <label htmlFor="title" className="form-label">Title of the Post</label>
      <input type="text" ref={postTitleElement} className="form-control" id="title" placeholder="Enter title" />
    </div>

    <div className="mb-3">
      <label htmlFor="body" className="form-label"> Content</label>
      <textarea type="text" ref={postBodyElement} rows="4" className="form-control" id="title" placeholder="Enter your content " />
    </div>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Reactions</label>
      <input type="text" ref={reactionsElement} className="form-control" id="title" placeholder="Enter the No.of Reactions" />
    </div>
    

    <div className="mb-3">
      <label htmlFor="tags " className="form-label">Hashtags</label>
      <textarea type="text" ref={tagsElement} rows="4" className="form-control" id="tags" placeholder="plz enter your tags using space " />
    </div>
    
    
    <button type="submit" className="btn btn-primary">Post</button>
  </form>
  );
}
export default Createpost;