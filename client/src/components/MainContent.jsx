import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Post from './Post';
import { axiosInstance } from '../config';

export default function MainContent() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axiosInstance.get(`/posts/${search}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPosts();
  }, [search]);

  return (
    <main className="mainContent">
      {posts.map((post) => (
        <Post data={post} key={post._id} />
      ))}
    </main>
  );
}
