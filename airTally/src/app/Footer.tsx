"use client";

import { useTheme } from "./themeContext";
import Link from "next/link";
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`${
      isDarkMode 
        ? 'bg-gradient-to-r from-fuchsia-900/10 to-purple-900/10 border-gray-700 text-gray-400' 
        : 'bg-cyan-50/80 border-blue-200 text-gray-600'
    } border-t transition-colors duration-200 mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="flex flex-col gap-2">
            <h3 className={`${
              isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-800'
            } font-semibold mb-2`}>
              About
            </h3>
            <Link
              href="/"
              className={`${
                isDarkMode ? 'hover:text-violet-400' : 'hover:text-violet-600'
              } transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              href="/learn"
              className={`${
                isDarkMode ? 'hover:text-violet-400' : 'hover:text-violet-600'
              } transition-colors duration-200`}
            >
              Learn More
            </Link>
          </div>

          {/* Legal Section */}
          <div className="flex flex-col gap-2">
            <h3 className={`${
              isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-800'
            } font-semibold mb-2`}>
              Legal
            </h3>
            <Link
              href="/privacy"
              className={`${
                isDarkMode ? 'hover:text-violet-400' : 'hover:text-violet-600'
              } transition-colors duration-200`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/tos"
              className={`${
                isDarkMode ? 'hover:text-violet-400' : 'hover:text-violet-600'
              } transition-colors duration-200`}
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie"
              className={`${
                isDarkMode ? 'hover:text-violet-400' : 'hover:text-violet-600'
              } transition-colors duration-200`}
            >
              Cookie Policy
            </Link>
          </div>

          {/* Resources Section */}
          <div className="flex flex-col gap-2">
            <h3 className={`${
              isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-800'
            } font-semibold mb-2`}>
              Resources
            </h3>
            {/* <Link
              href="/docs"
              className={`${
                isDarkMode ? 'hover:text-violet-400' : 'hover:text-violet-600'
              } transition-colors duration-200`}
            >
              Documentation
            </Link> */}
            <Link
              href="/contact"
              className={`${
                isDarkMode ? 'hover:text-violet-400' : 'hover:text-violet-600'
              } transition-colors duration-200`}
            >
              Contact Me
            </Link>
          </div>

          {/* Connect Section */}
          <div className="flex flex-col gap-2">
            <h3 className={`${
              isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-800'
            } font-semibold mb-2`}>
              Connect
            </h3>
            <Link
              href="https://github.com/Oia20/airtally"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isDarkMode ? 'hover:text-violet-400' : 'hover:text-violet-600'
              } transition-colors duration-200 flex items-center gap-2`}
            >
              <GitHubIcon fontSize="small" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className={`py-4 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-blue-200'
        } flex flex-col sm:flex-row justify-between items-center gap-4`}>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <FavoriteIcon 
              className={`${
                isDarkMode ? 'text-fuchsia-400' : 'text-fuchsia-600'
              } text-sm`}
              fontSize="small"
            />
            <span>by</span>
            <Link
              href="https://github.com/Oia20"
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isDarkMode ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'
              } transition-colors duration-200`}
            >
              Oia20
            </Link>
          </div>
          
          <div className="text-sm">
            © {new Date().getFullYear()} AirTally.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 