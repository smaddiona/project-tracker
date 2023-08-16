import React, { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Toaster, toast } from "react-hot-toast";
import { exists, createDir, writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';

function Layout() {

  const checkDir = async () => {
    const baseDirExists = await exists('devmgr_data', {dir: BaseDirectory.Document});
    if (!baseDirExists) {
      toast('Creating base directory');
      await createDir('devmgr_data', {dir: BaseDirectory.Document});
    } else {
      toast('Base directory exists');
    }

    const dbDirExists = await exists('devmgr_data/db.json', {dir: BaseDirectory.Document});
    if (!dbDirExists) {
      toast('Creating db file');
      await writeTextFile('devmgr_data/db.json', '{}', {dir: BaseDirectory.Document});
    } else {
      toast('DB file exists');
    }
  };

  useEffect(() => {
    checkDir();
  }, []);


  return (
    <Fragment>
      <Toaster position="top-right" toastOptions={{className: 'rounded-xl bg-zinc-800 p-4 text-zinc-200'}}  />
      <NavBar />
      <div className="mt-6 max-w-7xl mx-auto dark text-foreground bg-background">
        <Outlet />
      </div>
    </Fragment>
  );
}

export default Layout;
