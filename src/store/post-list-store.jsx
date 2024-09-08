import {  createContext, useReducer,useCallback, useState,useEffect } from "react";
 export const PostList=createContext({
    postList:[],
    addPost:()=>{},
    fetching:false,
    deletePost:()=>{},
 });

const postListReducer=(currPostList,action)=>{
    let newPostList=currPostList
    if (action.type==='DELETE_POST'){
        newPostList=currPostList.filter(post=>post.id!==action.payload.postId);

    } else if (action.type==='ADD_INITIAL_POSTS'){
        newPostList=action.payload.posts;
    } else if (action.type==='ADD_POST'){
        newPostList=[action.payload,...currPostList]
    }
    return newPostList;

    
};
const PostListProvider=({children})=>{
    const[postList,dispatchPostList]=useReducer(postListReducer,[]);
    const [fetching,setFetching]=useState(false);

    const addPost=(post)=>{
        dispatchPostList({
            type:'ADD_POST',
            payload:post,
        })

    }
    // the below code is used for add more no.of posts when the posts are fetched from server using dummy api f
    const addInitialPosts=(posts)=>{
        dispatchPostList({
            type:'ADD_INITIAL_POSTS',
            payload:{
                posts,
            }
        })

    }

    const deletePost=useCallback((postId)=>{
        dispatchPostList({
            type:'DELETE_POST',
            payload:{
                postId,
            },
        })

    },[dispatchPostList]);


      
    useEffect(()=>{
        // before fetching we are setting the value as true but intial value is false when we are using effect it becmoes false
    
        setFetching(true);  
        const controller =new AbortController();
        const signal=controller.signal;
    
        fetch('https://dummyjson.com/posts',{signal})
        .then(res => res.json())
        .then(data=>{
            addInitialPosts(data.posts);
            setFetching(false);
            // after fetching we are setting it as false
    
        }); 
    
        return ()=>{
            controller.abort();
        };
    
       },[]); 


    return <PostList.Provider value={
        {postList,addPost,fetching,deletePost}
    }>
        {children}
    </PostList.Provider>

}


export default PostListProvider;