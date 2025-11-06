import { quicksand } from '@/branding/fonts';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        `flex flex-row items-center ${quicksand.className} text-3xl self-start w-full rounded-lg bg-blue-500 hover:bg-blue-400 active:bg-blue-300 p-3 px-6 text-white transition-colors`,
        className,
      )}
    >
      {children}
    </button>
  );
}