import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { quicksand } from '@/branding/fonts';

export default function LinkButton({href, displayText}: {href: string, displayText: string}) {
    return (
        <Link
            href={href}
            className="flex flex-row items-center self-start w-full rounded-lg bg-blue-500 hover:bg-blue-400 active:bg-blue-300 p-3 text-white transition-colors"
        >
            <div className={`${quicksand.className} px-6 text-3xl flex flex-row gap-3`}>{displayText} <ArrowRightIcon className="w-6" /></div>
        </Link>
    )
}