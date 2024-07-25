"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", herf: "/" },
    { label: "Issues", herf: "/issues" },
  ];
  return (
    <nav className="flex border-b px-5 h-14 items-center space-x-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-5">
        {links.map((link) => (
          <Link
            className={classnames({
              "text-zinc-900": currentPath === link.herf,
              "text-zinc-500": currentPath !== link.herf,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.herf}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
