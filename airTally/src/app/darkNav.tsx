import { useState } from "react";
import Link from "next/link";
import { Button, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import { NoAccounts, Star } from "@mui/icons-material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="bg-gradient-to-r from-fuchsia-900/10 to-purple-900/10 border-gray-700
      shadow-sm border-b transition-colors duration-200 sticky top-0 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-fuchsia-400 transition-all duration-300 hover:scale-105 hover:cursor-pointer">
              <Link href="/">
                AirTally
              </Link>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button className="bg-fuchsia-500 hover:bg-fuchsia-600" onClick={() => window.open('https://github.com/Oia20/airtally', '_blank')} variant="contained" color="primary">GitHub</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;