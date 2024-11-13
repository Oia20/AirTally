import Folders from "./folders";
import Navbar from "./Navbar";
import { FolderProvider } from "./folderContext";
import { ClerkProvider } from "@clerk/nextjs";

interface User {
  id: string;
  name: string;
  email: string;
}

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store'
  });
  const users: User[] = await response.json();
  
  return (
    <ClerkProvider>
      <>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
        <FolderProvider>
          <Navbar />
          <Folders />
        </FolderProvider>
      </>
    </ClerkProvider>
  );
}