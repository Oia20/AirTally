import Folders from "./folders";
import Navbar from "./Navbar";
import { FolderProvider } from "./folderContext";

export default async function Home() {

  return (
    <>
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