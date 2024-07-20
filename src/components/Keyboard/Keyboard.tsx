import { useEffect } from "react";

// Styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./Keyboard.module.scss";

const mc = mapClassesCurried(maps, true) as (cn: string) => string;

const isValidKeyPress = (key: string, vowelMode: boolean) => {
  if (/^[A-Z]$/i.test(key)) {
    if (vowelMode) {
      return /^[AEIOU]$/i.test(key); // Should be a vowel
    } else {
      return !/^[AEIOU]$/i.test(key); // Should not be a vowel
    }
  }
  return false; // Not a letter
};

// Types
export interface KeyboardProps {
  vowelMode: boolean;
  usedChar: string[];
  onClick: (char: string) => void;
  className?: HTMLElement["className"];
}

export default function Keyboard({ vowelMode, usedChar = [], onClick = () => {}, className }: KeyboardProps) {
  const classlist = useClassList({ defaultClass: "keyboard", className, maps, string: true }) as string;

  // Listen for keyboard presses too
  useEffect(() => {
    const onKeyPress = ({ key }: KeyboardEvent) => {
      if (isValidKeyPress(key, vowelMode)) onClick(key.toUpperCase());
    };

    window.addEventListener("keypress", onKeyPress);

    return () => window.removeEventListener("keypress", onKeyPress);
  }, [vowelMode, onClick]);

  return (
    <div className={classlist}>
      <div className={mc("keyboard__row")}>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((k) => (
          <button
            onClick={() => onClick(k)}
            disabled={
              (/^[AEIOU]$/i.test(k) && !vowelMode) || (!/^[AEIOU]$/i.test(k) && vowelMode) || usedChar.includes(k)
            }
            key={k}
            className={mc("keyboard__key")}
          >
            {k}
          </button>
        ))}
      </div>
      <div className={mc("keyboard__row")}>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((k) => (
          <button
            onClick={() => onClick(k)}
            disabled={
              (/^[AEIOU]$/i.test(k) && !vowelMode) || (!/^[AEIOU]$/i.test(k) && vowelMode) || usedChar.includes(k)
            }
            key={k}
            className={mc("keyboard__key")}
          >
            {k}
          </button>
        ))}
      </div>
      <div className={mc("keyboard__row")}>
        {["Z", "X", "C", "V", "B", "N", "M"].map((k) => (
          <button
            onClick={() => onClick(k)}
            disabled={
              (/^[AEIOU]$/i.test(k) && !vowelMode) || (!/^[AEIOU]$/i.test(k) && vowelMode) || usedChar.includes(k)
            }
            key={k}
            className={mc("keyboard__key")}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
