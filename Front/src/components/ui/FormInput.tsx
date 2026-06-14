import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export default function FormInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        'w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20',
        className,
      )}
      {...props}
    />
  );
}
