import React from 'react';
import NavBar from '../components/NavBar';
import WritePost from '../components/WritePost';

export default function WritePage() {
  return (
    <div className="writePage">
      <NavBar />
      <WritePost />
    </div>
  );
}
