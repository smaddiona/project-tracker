import { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Input,
} from "@nextui-org/react";
import { Command } from "@tauri-apps/api/shell";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import { toast } from "react-hot-toast";
import { readTextFile, writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { useRefreshAtom } from "../store";

function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const {refresh, setRefresh} = useRefreshAtom();

  const init = async () => {
    const db = await readTextFile("devmgr_data/db.json", {
      dir: BaseDirectory.Document,
    });
    setProjects(JSON.parse(db).apps);
    setFilteredProjects(JSON.parse(db).apps);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if(refresh){
      init();
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const openProject = async (project: any) => {
    console.log(project.directory);
    const vscode = new Command("open-vs-code", [project.directory]);
    const vschild = await vscode.spawn();
  };

  const deleteProject = async (project: any) => {
    const db = await readTextFile("devmgr_data/db.json", {
      dir: BaseDirectory.Document,
    });
    const dbJson = JSON.parse(db);
    const newDb = dbJson.apps.filter((app: any) => app.id !== project.id);
    await writeTextFile(
      "devmgr_data/db.json",
      JSON.stringify({ ...dbJson, apps: newDb }),
      { dir: BaseDirectory.Document }
    );
    toast.success("Project deleted");
    init();
    setIsOpen(false);
  };
  return (
    <Fragment>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4">
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredProjects.length > 0 &&
          filteredProjects.map((project, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-col justify-center items-start">
                <Chip color="default" variant="shadow">
                  {project.customer[0].name}
                </Chip>
                <div className="text-3xl font-bold">{project.name}</div>
              </CardHeader>
              <CardBody>
                <div className="text-sm text-zinc-400">
                  {project.description}
                </div>
              </CardBody>
              <CardFooter className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={() => {
                    setSelectedProject(project);
                    setIsOpen(!isOpen);
                  }}
                  color="danger"
                  variant="flat"
                  className="w-full"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    openProject(project);
                  }}
                  color="primary"
                  variant="flat"
                  className="w-full"
                >
                  Open
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onOpenChange={() => setIsOpen(false)}
        onConfirm={() => deleteProject(selectedProject)}
      />
    </Fragment>
  );
}

export default Home;
