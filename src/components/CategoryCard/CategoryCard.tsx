// Styles
import styles from './CategoryCard.module.scss';

// Types
import type { ComponentChildren } from 'preact';

export interface CategoryCardProps {
  icon: string;
  description: string;
  children: ComponentChildren;
  onClick: () => void;
}

export default function CategoryCard({ icon, description, children, onClick }: CategoryCardProps) {
  return (
    <button className={styles['category-card']} onClick={onClick}>
      <span className={styles['category-card__icon']}>{icon}</span>
      <h3 className={styles['category-card__text']}>{children}</h3>
      <p className={styles['category-card__desc']}>{description}</p>
    </button>
  );
}
