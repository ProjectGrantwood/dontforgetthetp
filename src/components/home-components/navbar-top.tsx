"use client";

import {
  DocumentTextIcon,
  HomeIcon,
  FaceSmileIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "home", href: "/home", icon: HomeIcon },
  { name: "lists", href: "/home/lists", icon: DocumentTextIcon },
  { name: "friends", href: "/home/friends", icon: FaceSmileIcon },
  { name: "account", href: "/handler/account-settings", icon: UserIcon },
];

export default function NavbarTop() {
  const pathname = usePathname();
  return (
    <div className="flex flex-row justify-between items-center w-full h-16 min-h-16 bg-gray-700">
      {links.map((l) => {
        const LinkIcon = l.icon;
        return (
          <div key={l.name} className="p-3 m-auto">
            <Link
              href={l.href}
              className={clsx(pathname === l.href && "text-emerald-500")}
            >
              <LinkIcon className="w-8 h-8" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
