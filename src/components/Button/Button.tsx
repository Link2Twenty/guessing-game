// Styles
import styles from './Button.module.scss';

// Types
import type { ButtonHTMLAttributes } from 'preact';

export default function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles['btn']} {...props}>
      {children}
    </button>
  );
}
