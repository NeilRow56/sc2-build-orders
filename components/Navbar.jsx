import Link from "next/link";
import Login from "./Login";
import Logout from "./Logout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

async function Navbar() {
  const session = await getServerSession(authOptions);

  let Links = [
    { name: "Home", link: "/" },
    { name: "Admin", link: "/" },
    { name: "Dashboard", link: "/dashboard" },
    { name: "About", link: "/" },
  ];
  return (
    <div className="md:px24 flex h-12 w-full items-center justify-between bg-teal-700 px-6  text-white lg:px-72">
      <div className="">
        <h1 className="text-xl font-bold text-orange-400 md:text-2xl lg:text-3xl">
          Threadz
        </h1>
      </div>
      <ul className="flex items-center space-x-6 md:space-y-0">
        {Links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.link}
              className=" duration-500 hover:text-orange-400 "
            >
              {link.name}
            </Link>
          </li>
        ))}
        <ul className="flex items-center gap-6">
          {!session?.user && <Login />}
          {session?.user && <Logout image={session.user?.image || ""} />}
        </ul>
      </ul>
    </div>
  );
}

export default Navbar;
