// Styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./LetterBox.module.scss";

const mc = mapClassesCurried(maps, true) as (cn: string) => string;

// Types
export interface LetterBoxProps {
  char?: string;
  active: boolean;
  className?: HTMLElement["className"];
}

export default function LetterBox({ char, active, className }: LetterBoxProps) {
  const classlist = useClassList({ defaultClass: "letter-box", className, maps, string: true }) as string;

  return (
    <div className={classlist} aria-hidden={!active}>
      <div className={mc("letter-box__container")}>
        {char && <div className={mc("letter-box__character")}>{char}</div>}
        <div className={mc("letter-box__blank")} />
      </div>
    </div>
  );
}
