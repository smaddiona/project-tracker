import { Fragment, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import NewProjectModal from "./modals/NewProjectModal";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">DEVMGR</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={() => {setIsOpen(!isOpen)}} color="primary" href="#" variant="flat">
            New Project
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>

    <NewProjectModal isOpen={isOpen} onOpen={() => setIsOpen(true)} onOpenChange={() => setIsOpen(false)} />
    </Fragment>
  );
}

export default NavBar;
