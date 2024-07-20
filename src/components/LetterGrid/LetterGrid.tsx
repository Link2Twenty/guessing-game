// Styles
import useClassList from "@blocdigital/useclasslist";
import maps from "./LetterGrid.module.scss";
import LetterBox from "../LetterBox";

// Types
export interface LetterGridProps {
  guesses: string[];
  rows: [string, string, string, string];
  className?: HTMLElement["className"];
}

export default function LetterGrid({ guesses = [], rows, className }: LetterGridProps) {
  const classlist = useClassList({ defaultClass: "letter-grid", className, maps, string: true }) as string;

  return (
    <div className={classlist}>
      {rows.map((row, y) =>
        row
          .split("")
          .map((char, x) =>
            char === " " ? (
              <LetterBox active={false} key={`${x}:${y}:${char}:${row}`} />
            ) : (
              <LetterBox
                active={guesses.includes(char) || new RegExp(/\p{P}/u).test(char)}
                char={char}
                key={`${x}:${y}:${char}:${row}`}
              />
            )
          )
      )}
    </div>
  );
}
