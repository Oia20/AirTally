"use client";

import { useContext, useState } from "react";
import { FolderContext } from "./folderContext";
import { useAuth } from "./authContext";
import Link from "next/link";
import { Button, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import { AccountCircle, Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "./themeContext";

const Navbar = () => {
  const { setIsAddingFolder } = useContext(FolderContext);
  const { isAuthenticated, logout, userId } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-cyan-50 border-blue-200'} 
      shadow-sm border-b transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className={`text-xl font-bold ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-800'}`}>
              AirTally
            </span>
            {isAuthenticated && userId && (
              <span className={`text-sm ml-2 ${isDarkMode ? 'text-violet-400' : 'text-violet-500'}`}>
                ID: {userId}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setIsAddingFolder(true)}
              variant="contained"
              sx={{
                backgroundColor: isDarkMode ? 'rgb(232, 121, 249)' : 'rgb(192, 38, 211)', // fuchsia-400 : fuchsia-600
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgb(217, 70, 239)' : 'rgb(134, 25, 143)' // fuchsia-500 : fuchsia-800
                }
              }}
            >
              New Folder
            </Button>
            
            <IconButton
              onClick={handleMenu}
              sx={{ 
                color: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(139, 92, 246)', // violet-400 : violet-500
                '&:hover': {
                  color: isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(124, 58, 237)' // violet-500 : violet-600
                }
              }}
            >
              <AccountCircle />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(236, 254, 255)', // gray-800 : cyan-50
                  }
                }
              }}
            >
              <MenuItem 
                onClick={toggleTheme}
                className={`${isDarkMode ? 'text-violet-400' : 'text-violet-500'} 
                  hover:bg-blue-200/20`}
              >
                {isDarkMode ? <Brightness7 className="mr-2" /> : <Brightness4 className="mr-2" />}
                Theme: {isDarkMode ? 'Light' : 'Dark'}
              </MenuItem>
              <Divider className={isDarkMode ? 'bg-gray-700' : 'bg-blue-200'} />
              {isAuthenticated ? (
                <MenuItem 
                  onClick={() => { handleClose(); logout(); }}
                  className={`${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-800'} 
                    hover:bg-blue-200/20`}
                >
                  Logout
                </MenuItem>
              ) : (
                <MenuItem 
                  onClick={handleClose}
                  className="hover:bg-blue-200/20"
                >
                  <Link 
                    href="/login" 
                    className={`${isDarkMode ? 'text-fuchsia-400 hover:text-fuchsia-300' : 'text-fuchsia-800 hover:text-fuchsia-600'}`}
                  >
                    Login
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;