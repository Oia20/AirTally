import Folders from "./folders";
import Navbar from "./Navbar";
import { FolderProvider } from "./folderContext";
import { AuthProvider } from "./authContext";

export default function Home() {
  return (
    <AuthProvider>
      <FolderProvider>
        <Navbar />
        <Folders />
      </FolderProvider>
    </AuthProvider>
  );
}