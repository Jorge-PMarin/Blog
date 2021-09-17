import React from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import SinglePost from '../components/SinglePost';

export default function PostPage() {
  return (
    <>
      <NavBar />
      <div className="postPage">
        <SinglePost />
        <SideBar />
      </div>
    </>
  );
}
