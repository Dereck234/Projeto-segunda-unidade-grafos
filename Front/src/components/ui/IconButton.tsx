import type { ButtonHTMLAttributes } from 'react';
import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'> & Omit<HTMLMotionProps<'button'>, 'ref' | 'onDrag'>;

export default function IconButton({
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      whileHover={{ y: -1 }}
      className={clsx(
        'inline-flex items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 text-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
