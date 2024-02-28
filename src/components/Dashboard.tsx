
import React from 'react';
import Navbar from './Navbar.tsx';
import AddFolder from './addFolder.tsx';
import FolderContents from './folderContents.tsx'; // Import the new component
import { Routes, Route, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddFolder />} />
        <Route path="folder/:folderId" element={<FolderContents />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default Dashboard;
