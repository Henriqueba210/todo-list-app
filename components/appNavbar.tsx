import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";

export default function AppNavbar() {
  return (
    <Navbar>
      <Navbar.Brand href="https://flowbite.com/">
        <div className="mr-3 w-12 h-9 sm:h-9 relative">
          <Image src="/tasks-logo.svg" layout="fill" alt="Flowbite Logo" />
        </div>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Task Easy
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" active={true}>
          Dashboard
        </Navbar.Link>
        <Navbar.Link href="/navbars">Friends</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
