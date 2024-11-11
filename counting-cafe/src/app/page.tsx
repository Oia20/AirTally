import Folders from "./folders";
import Navbar from "./Navbar";
import { FolderProvider } from "./folderContext";
import {GET} from "./api/users";

export default async function Home() {
  const users = await GET();
  const userData = await users.json();

  return (
    <>
      {userData.map((user:any) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ))}
      <FolderProvider>
        <Navbar />
        {/* <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <div className="grid gap-4">
            {(await users.json()).map((user: any) => (
              <div key={user.id} className="p-4 border rounded shadow">
                <p className="font-semibold">{user.username}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            ))}
          </div>
        </div> */}
        <Folders />
      </FolderProvider>
    </>
  );
}