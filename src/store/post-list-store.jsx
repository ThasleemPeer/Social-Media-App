import { act, createContext, useReducer } from "react";

 const DEFAULT_CONTEXT={
    postList:[],
    addPost:()=>{},
    deletePost:()=>{},
}


 export const PostList=createContext({DEFAULT_CONTEXT});

const postListReducer=(currPostList,action)=>{
    let newPostList=currPostList
    if (action.type==='DELETE_POST'){
        newPostList=currPostList.filter(post=>post.id!==action.payload.postId);

    } else if (action.type==='ADD_POST'){
        newPostList=[action.payload,...currPostList]
    }
    return newPostList;

    
};
const PostListProvider=({children})=>{
    const[postList,dispatchPostList]=useReducer(postListReducer,DEFAULT_POST_LIST);


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
        {
        postList:postList,
        addPost:addPost,
        deletePost:deletePost
        }
    }>
        {children}
    </PostList.Provider>

}

const DEFAULT_POST_LIST=[
    {
        id:'1',
        title:'Going to Mumbai',
        body:'Hi! Friends, I am going to Mumbai for my Vacations,Hope to enjoy a lot .Peace Out!!',
        reactions:2,
        userId:'user-9',
        tags:["vacation","Mumbai","Enjoying"]
    },
    {
        id:'2',
        title:"Placed at one of the FAANG's",
        body:"16 saal ki mehnat ka $ phal. Beleive in God's Plan",
        reactions:55,
        userId:'user-361',
        tags:["SDE","Bengaluru","Engineer","Happy region"]
    }
]


export default PostListProvider;