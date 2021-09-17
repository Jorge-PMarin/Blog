import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Post from './Post';

const axios = require('axios');

const API = process.env.BASE_URL;

export default function MainContent() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get(`${API}/posts/${search}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPosts();
  }, [search]);

  return (
    <main className="mainContent">
      {posts.map((post) => <Post data={post} key={post._id} />)}
    </main>
  );
}
