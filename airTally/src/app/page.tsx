import Folders from "./folders";
import Navbar from "./Navbar";
import { FolderProvider } from "./folderContext";
import { AuthProvider } from "./authContext";
import { ThemeProvider } from "./themeContext";

export default function Home() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FolderProvider>
          <Navbar />
          <Folders />
        </FolderProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}