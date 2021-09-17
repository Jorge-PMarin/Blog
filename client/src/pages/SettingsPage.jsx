import React from 'react';
import Settings from '../components/Settings';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

export default function SettingsPage() {
  return (
    <>
      <NavBar />
      <div className="settingsPage">
        <Settings />
        <SideBar />
      </div>
    </>
  );
}
