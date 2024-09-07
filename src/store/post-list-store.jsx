import {  createContext, useReducer } from "react";
 export const PostList=createContext({
    postList:[],
    addPost:()=>{},
    addInitialPosts:()=>{},
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


    const addPost=(userId,postTitle,postbody,reactions,tags)=>{
        dispatchPostList({
            type:'ADD_POST',
            payload:{
                id:Date.now(),
                title:postTitle,
                body:postbody,
                reactions:reactions,
                userId:userId,
                tags:tags
            }
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

    const deletePost=(postId)=>{
        console.log(`delete post called for ${postId}`);
        dispatchPostList({
            type:'DELETE_POST',
            payload:{
                postId,
            },
        })

    }
    return <PostList.Provider value={
        {postList,addPost,addInitialPosts,deletePost}
    }>
        {children}
    </PostList.Provider>

}


export default PostListProvider;