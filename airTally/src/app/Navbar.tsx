"use client";

import { useContext, useState } from "react";
import { FolderContext } from "./folderContext";
import { useAuth } from "./authContext";
import Link from "next/link";
import { Button, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import { AccountCircle, Brightness4, Brightness7, Star, Login, Logout, NoAccounts } from "@mui/icons-material";
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
    <nav className={`${isDarkMode ? 'bg-gradient-to-r from-fuchsia-900/10 to-purple-900/10 border-gray-700' : 'bg-cyan-50/80 border-blue-200'} 
      shadow-sm border-b transition-colors duration-200 sticky top-0 backdrop-blur-sm z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className={`text-xl font-bold ${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-800'} 
              transition-all duration-300 hover:scale-105`}>
              AirTally
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              onClick={() => setIsAddingFolder(true)}
              variant="contained"
              startIcon={<span className="hidden sm:inline text-lg">+</span>}
              sx={{
                backgroundColor: isDarkMode ? 'rgb(232, 121, 249)' : 'rgb(192, 38, 211)',
                '&:hover': {
                  backgroundColor: isDarkMode ? 'rgb(217, 70, 239)' : 'rgb(134, 25, 143)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s',
                textTransform: 'none',
                borderRadius: '9999px',
                padding: {
                  xs: '0',
                  sm: '4px 12px'
                },
                minWidth: {
                  xs: '36px',
                  sm: 'auto'
                },
                height: '36px',
                width: {
                  xs: '36px',
                  sm: 'auto'
                },
              }}
            >
              <span className="sm:hidden text-lg">+</span>
              <span className="hidden sm:inline">New Folder</span>
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
              {isAuthenticated ? <AccountCircle /> : <NoAccounts />}
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'rgb(236, 254, 255)',
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
              <MenuItem 
                component="a"
                href="https://github.com/Oia20/airtally"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDarkMode ? 'text-violet-400' : 'text-violet-500'} 
                  hover:bg-blue-200/20`}
              >
              <Star className="mr-1" />on GitHub
              </MenuItem>
              <Divider className={isDarkMode ? 'bg-gray-700' : 'bg-blue-200'}/>
              {isAuthenticated ? (
                <MenuItem 
                  onClick={() => { handleClose(); logout(); }}
                  className={`${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-800'} 
                    hover:bg-blue-200/20`}
                >
                  <Logout className="mr-1" />Logout
                </MenuItem>
              ) : (
                <MenuItem 
                  onClick={() => { handleClose(); window.location.href = '/login'; }}
                  className="hover:bg-blue-200/20"
                >
                  <Link 
                    href="/login" 
                    className={`${isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-800'}`}
                  >
                    <Login className="mr-1" />Login
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