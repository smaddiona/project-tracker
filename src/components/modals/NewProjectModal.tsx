import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import CustomerSelect from "../select/CustomerSelect";
import { toast } from "react-hot-toast";
import { readTextFile, writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { useRefreshAtom } from "../../store";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
}

function NewProjectModal({ isOpen, onOpen, onOpenChange }: Props) {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [directory, setDirectory] = useState<string>("");
  const {refresh, setRefresh} = useRefreshAtom();

  const init = async () => {
    const db = await readTextFile("devmgr_data/db.json", {
      dir: BaseDirectory.Document,
    });
    console.log(JSON.parse(db));
    setCustomers((JSON.parse(db)).customers);
    setSelectedCustomer((JSON.parse(db)).customers[0]);
  };

  useEffect(() => {
    init();
  }, []);

  const createProject = async () => {
    let customer = selectedCustomer ? selectedCustomer : "";
    let data = {
      name: name,
      description: description,
      directory: directory,
      tags: [],
      customer: [customer],
    };
    const db = await readTextFile("devmgr_data/db.json", {
      dir: BaseDirectory.Document,
    });
    const dbJson = JSON.parse(db);
    const newDb = [...dbJson.apps, data];
    await writeTextFile(
      "devmgr_data/db.json",
      JSON.stringify({ ...dbJson, apps: newDb }),
      { dir: BaseDirectory.Document }
    );
    toast.success("Project created");
    init();
    setRefresh(true);
    onOpenChange();
    resetValues();
  };

  const resetValues = () => {
    setName("");
    setDescription("");
    setDirectory("");
    setSelectedCustomer(null);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New project
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Project name"
                  className="my-1"
                />
                <Input
                  type="text"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Project description"
                  className="my-1"
                />
                <Input
                  type="text"
                  label="Directory"
                  value={directory}
                  onChange={(e) => setDirectory(e.target.value)}
                  placeholder="The folder of the project"
                  className="my-1"
                />
                {customers.length > 0 && selectedCustomer && (
                  <CustomerSelect
                    value={selectedCustomer}
                    onChange={setSelectedCustomer}
                    customers={customers}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={createProject}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewProjectModal;
