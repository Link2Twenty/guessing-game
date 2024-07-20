import { useCallback, useState } from "react";

// Helpers
import { allLetter, formatString, randomItem } from "../../Helpers/helpers";

// Components
import LetterGrid from "../../components/LetterGrid";
import Keyboard from "../../components/Keyboard";
import Button from "../../components/Button";

// Styles
import { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./Main.module.scss";

const mc = mapClassesCurried(maps, true) as (cn: string) => string;

// Types
export interface MainProps {
  phrases: string[];
}

export default function Main({ phrases }: MainProps) {
  const [vowelMode, setVowelMode] = useState(false);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [phrase, setPhrase] = useState(formatString(randomItem(phrases)));

  const handleKeyPress = useCallback((char: string) => {
    setGuessed((l) => [...l, char]);
  }, []);

  return (
    <main className={mc("main")}>
      <section className={mc("main__controls")}>
        <Button onClick={() => setGuessed([])}>Reset</Button>
        <Button onClick={() => setPhrase(formatString(randomItem(phrases)))}>Change Puzzle</Button>
        <Button onClick={() => setGuessed(allLetter)}>Solve</Button>
        <Button aria-pressed={vowelMode} onClick={() => setVowelMode((b) => !b)}>
          Toggle Vowel
        </Button>
      </section>
      <section className={mc("main__gameboard")}>
        <LetterGrid rows={phrase} guesses={guessed} />
      </section>
      <section className={mc("main__keyboard")}>
        <Keyboard vowelMode={vowelMode} usedChar={guessed} onClick={handleKeyPress} />
      </section>
    </main>
  );
}
