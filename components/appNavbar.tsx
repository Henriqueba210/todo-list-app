import { signOut } from "firebase/auth";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";

export default function AppNavbar() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  const signout = () => {
    signOut(auth).then(() => router.replace("/login"));
  };

  if (user)
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
                img="https://img.icons8.com/cotton/64/000000/user-male-circle.png"
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{username}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => signout()}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse>
          <Navbar.Link href="/navbars" active={true}>
            Dashboard
          </Navbar.Link>
          <Navbar.Link href="/navbars">Shared With Me</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  else return null;
}
