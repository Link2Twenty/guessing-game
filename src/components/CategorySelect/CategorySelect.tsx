import { useCallback, useContext, useEffect, useRef } from "preact/hooks";

// Components
import CategoryCard from "../CategoryCard";

// Context
import { CategorySelectContext } from "../../hooks/useCategorySelect";

// Styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./CategorySelect.module.scss";

const mc = mapClassesCurried(maps, true);

// Types
import type { JSX } from "preact";

type category = { id: string | number; icon: string; title: string; description: string };

export interface CategorySelectProps {
  open: boolean;
  onClose: () => void;
  categories: category[];
  className?: HTMLElement["className"];
}

export default function CategorySelect({ open, categories, className, onClose }: CategorySelectProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { changeCategory } = useContext(CategorySelectContext) || {};

  const classlist = useClassList(
    { defaultClass: "category-select", className, maps, string: true },
    useCallback((_c: string[]) => !open && _c.push("category-select--close"), [open])
  );

  /**
   * Trigger full close of modal
   *
   * @param event Animation end event
   * @param event.target the dom element triggering the event
   */
  const handleAnimationEnd = ({ target }: JSX.TargetedAnimationEvent<HTMLDialogElement>) => {
    if (open || target !== modalRef.current) return;

    modalRef.current?.close();
  };

  const handleSelection = (id: category["id"], title: category["title"]) => {
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
    <dialog ref={modalRef} className={classlist} onAnimationEnd={handleAnimationEnd}>
      <div tabIndex={-1} className={mc("category-select__container")}>
        <h2>🎯 Category Selection</h2>
        <p>Choose a category and see if you’ve got what it takes to solve the puzzle!</p>
        <div className={mc("category-select__grid")}>
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
