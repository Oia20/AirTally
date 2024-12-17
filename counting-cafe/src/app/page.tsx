import Folders from "./folders";
import Navbar from "./Navbar";
import { FolderProvider } from "./folderContext";
import { AuthProvider } from "./authContext";
import { ThemeProvider } from "./themeContext";

export default function Home() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <FolderProvider>
        <Navbar />
        <Folders />
      </FolderProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}