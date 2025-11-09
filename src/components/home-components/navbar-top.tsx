
import {
    ListBulletIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';

export default function NavbarTop() {
    return (
        <div className="flex flex-row justify-between items-center w-full h-16 bg-gray-700">
            <div className="p-3 m-auto"><ListBulletIcon className="w-8 h-8 " /></div>
            <div className="p-3 m-auto"><UserCircleIcon className="w-8 h-8" /></div>
        </div>
    )
}