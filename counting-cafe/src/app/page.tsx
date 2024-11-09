"use client";

import { useState } from "react";
import Folders from "./folders";
import Navbar from "./Navbar";

export default function Home() {
  const [isAddingFolder, setIsAddingFolder] = useState(false);

  return (
    <>
      <Navbar onNewFolder={() => setIsAddingFolder(true)} />
      <Folders isAddingFolder={isAddingFolder} setIsAddingFolder={setIsAddingFolder} />
    </>
  );
}