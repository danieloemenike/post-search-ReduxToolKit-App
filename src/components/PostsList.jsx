import React, { useEffect } from "react";
import SearchPost from "./SearchPost";
import "./Posts.css";
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from "../redux/slice/postSlice";


const PostsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts()) 
  }, [])

  const { posts, loading, error } = useSelector((state) => state.posts)
  
 
  return (
    <>
      <SearchPost />
      <div className="posts-list">
        <h1>Total Posts {posts.length}</h1>
        { loading ? (<h2> Loading..Please wait</h2>) :
          error ? (<h3>{ error  } - No post found  </h3>)
          : (
            posts.map((post) => (
            <div key={ post.id } className ="post-details">
              <h2> { post.title }  </h2>
              <p>  {post.body} </p>
            </div>)
            ))
        }
      </div>
    </>
  );
};

export default PostsList;
