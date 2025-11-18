import Link from "next/link";
import { quicksand } from "@/branding/fonts";

export default function LinkButton({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex flex-row items-center self-start w-full rounded-lg bg-blue-500 hover:bg-blue-400 active:bg-blue-300 p-3 text-white transition-colors"
    >
      <div
        className={`${quicksand.className} px-6 text-3xl flex flex-row gap-3`}
      >
        {children}
      </div>
    </Link>
  );
}
