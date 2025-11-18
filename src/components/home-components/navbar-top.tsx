import { ListBulletIcon } from "@heroicons/react/24/outline";
import { UserButton } from "@stackframe/stack";
import Link from "next/link";

export default function NavbarTop() {
  return (
    <div className="flex flex-row justify-between items-center w-full h-16 bg-gray-700">
      <div className="p-3 m-auto">
        <Link href="/home/lists">
          <ListBulletIcon className="w-8 h-8 " />
        </Link>
      </div>
      <div className="p-3 m-auto">
        <UserButton />
      </div>
    </div>
  );
}
