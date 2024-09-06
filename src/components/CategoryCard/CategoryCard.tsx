// Styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./CategoryCard.module.scss";

const mc = mapClassesCurried(maps, true);

// Types
export interface CategoryCardProps {
  icon: string;
  description: string;
  className?: HTMLElement["className"];
  children: React.ReactNode;
  onClick: () => void;
}

export default function CategoryCard({ icon, description, className, children, onClick }: CategoryCardProps) {
  const classlist = useClassList({ defaultClass: "category-card", className, maps, string: true });

  return (
    <button className={classlist} onClick={onClick}>
      <span className={mc("category-card__icon")}>{icon}</span>
      <h3 className={mc("category-card__text")}>{children}</h3>
      <p className={mc("category-card__desc")}>{description}</p>
    </button>
  );
}
