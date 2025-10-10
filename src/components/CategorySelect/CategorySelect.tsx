import { useContext, useEffect, useRef } from 'preact/hooks';

// Components
import CategoryCard from '../CategoryCard';

// Context
import { CategorySelectContext } from '../../hooks/useCategorySelect';

// Styles
import styles from './CategorySelect.module.scss';

// Types
import type { TargetedAnimationEvent } from 'preact';

type category = { id: string | number; icon: string; title: string; description: string };

export interface CategorySelectProps {
  open: boolean;
  onClose: () => void;
  categories: category[];
}

export default function CategorySelect({ open, categories, onClose }: CategorySelectProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { changeCategory } = useContext(CategorySelectContext) || {};

  /**
   * Trigger full close of modal
   *
   * @param event Animation end event
   * @param event.target the dom element triggering the event
   */
  const handleAnimationEnd = ({ target }: TargetedAnimationEvent<HTMLDialogElement>) => {
    if (open || target !== modalRef.current) return;

    modalRef.current?.close();
  };

  const handleSelection = (id: category['id'], title: category['title']) => {
    onClose();
    changeCategory?.(id, title);
  };

  // Open the model when open is set
  useEffect(() => {
    if (!open) return;

    const { current: el } = modalRef;

    if (el && !el.open) el.showModal();
  }, [open]);

  return (
    <dialog ref={modalRef} className={styles['category-select']} onAnimationEnd={handleAnimationEnd} data-open={open}>
      <div tabIndex={-1} className={styles['category-select__container']}>
        <h2>🎯 Category Selection</h2>
        <p>Choose a category and see if you’ve got what it takes to solve the puzzle!</p>
        <div className={styles['category-select__grid']}>
          {categories.map(({ id, icon, title, description }) => (
            <CategoryCard key={id} icon={icon} description={description} onClick={() => handleSelection(id, title)}>
              {title}
            </CategoryCard>
          ))}
        </div>
      </div>
    </dialog>
  );
}
