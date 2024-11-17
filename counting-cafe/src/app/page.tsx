import Folders from "./folders";
import Navbar from "./Navbar";
import { FolderProvider } from "./folderContext";

export default function Home() {
  return (
    <FolderProvider>
      <Navbar />
      <Folders />
    </FolderProvider>
  );
}