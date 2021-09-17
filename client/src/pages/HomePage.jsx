import React from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import SideBar from '../components/SideBar';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Header />
      <div className="homePage">
        <MainContent />
        <SideBar />
      </div>
    </>
  );
}
