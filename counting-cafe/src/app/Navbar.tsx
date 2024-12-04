"use client";

import { useContext } from "react";
import { FolderContext } from "./folderContext";
import { useAuth } from "./authContext";
import Link from "next/link";
import { Button } from "@mui/material";

const Navbar = () => {
  const { setIsAddingFolder } = useContext(FolderContext);
  const { isAuthenticated, logout, userId } = useAuth();
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">AirTally</span>
            {isAuthenticated && userId && <span className="text-sm text-gray-500 ml-2">User ID: {userId}</span>}
          </div>
          <div className="flex items-center">
              <Button 
                onClick={() => setIsAddingFolder(true)}
                variant="contained"
                color="primary"
              >
                New Folder
              </Button>
              <div className="ml-4">
                {isAuthenticated ? (
                  <Button onClick={logout} className="text-blue-500 hover:text-blue-600">Logout</Button>
                ) : (
                  <Button variant="outlined" color="primary">
                    <Link href="/login" className="text-blue-500 hover:text-blue-600">Login</Link>
                  </Button>
                )}
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;