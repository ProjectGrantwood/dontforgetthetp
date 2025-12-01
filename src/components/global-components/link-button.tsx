import Link from "next/link";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href: string;
}

export default function LinkButton({ children, href, className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        `flex flex-row items-center self-start w-full rounded-lg bg-blue-500 hover:bg-blue-400 active:bg-blue-300 p-3 text-white transition-colors`,
        className,
      )}
    >
      {children}
    </Link>
  );
}
