import Folders from "./folders";
import Navbar from "./Navbar";
import { FolderProvider } from "./folderContext";
import { AuthProvider } from "./authContext";
import { ThemeProvider } from "./themeContext";
import Footer from "./Footer";

export default function Home() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FolderProvider>
          <Navbar />
          <Folders />
          <Footer />
        </FolderProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}